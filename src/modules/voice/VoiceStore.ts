import Voice, {
  SpeechEndEvent,
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechStartEvent,
  SpeechVolumeChangeEvent,
} from '@react-native-voice/voice';
import { makeAutoObservable } from 'mobx';

import { Nullable } from '../../base/types/BaseTypes';
import VoiceService from './VoiceService';
import VoiceHelper from './helpers/VoiceHelper';

export class VoiceStore {
  isStarted: boolean = false;
  isSpeechRecognized: boolean = false;

  speechError: Nullable<string> = null;
  speechVolume: Nullable<number> = null;

  /**
   * Mostly needed for manual shutdown of the voice recognition functionality for ios. Android stops automatically.
   */
  startTimer: number = 0;
  speechTimer: number = 0;
  startInterval: Nullable<ReturnType<typeof setInterval>> = null;
  speechInterval: Nullable<ReturnType<typeof setInterval>> = null;

  speechResults: string[] = [];
  speechPartialResults: string[] = [];

  private voiceService: VoiceService;

  constructor() {
    makeAutoObservable(this);
    this.voiceService = new VoiceService();
  }

  // MAIN

  initVoiceRecognition = () => {
    if (!this.isStarted) {
      Voice.onSpeechStart = this.setIsStartedRecognizing;
      Voice.onSpeechEnd = this.setIsEndedRecognizing;
      Voice.onSpeechRecognized = this.setIsSpeechRecognized;
      Voice.onSpeechError = this.setSpeechError;
      Voice.onSpeechResults = this.setSpeechResults;
      Voice.onSpeechPartialResults = this.setSpeechPartialResults;
      Voice.onSpeechVolumeChanged = this.setSpeechVolume;
    }
  };

  startRecognizing = async () => {
    this.resetVoiceData();
    await this.voiceService.startRecognizing();
  };

  stopRecognizing = async () => {
    await this.voiceService.stopRecognizing();
    this.setIsStarted(false);
    this.resetStartInterval();
    this.resetSpeechInterval();
  };

  // SETTERS

  setSpeechResults = (e: SpeechResultsEvent) => {
    this.speechResults = this.voiceService.prepareSpeechResults(e);
  };

  setSpeechPartialResults = (e: SpeechResultsEvent) => {
    if (this.isStarted) {
      this.runSpeechTimer();
    }

    this.speechPartialResults = this.voiceService.prepareSpeechResults(e);
  };

  setIsStartedRecognizing = (e: SpeechStartEvent) => {
    this.setIsStarted(this.voiceService.prepareIsStarted(e));
  };

  /**
   * For ios it runs after stop only if something was said.
   * For android, it runs on auto-stop after speech.
   */
  setIsEndedRecognizing = (e: SpeechEndEvent) => {
    this.setIsStarted(!this.voiceService.prepareIsStarted(e));
    this.resetStartInterval();
    this.resetSpeechInterval();
  };

  setIsSpeechRecognized = (e: SpeechRecognizedEvent) => {
    this.isSpeechRecognized = this.voiceService.prepareIsSpeechRecognized(e);
  };

  setSpeechVolume = (e: SpeechVolumeChangeEvent) => {
    this.speechVolume = this.voiceService.prepareSpeechVolume(e);
  };

  setSpeechError = async (e: SpeechErrorEvent) => {
    this.setIsStarted(false);
    this.speechError = this.voiceService.prepareSpeechError(e);
  };

  setSpeechTimer = () => {
    this.speechTimer = this.speechTimer + 1;
  };

  setStartTimer = () => {
    this.startTimer = this.startTimer + 1;
  };

  setIsStarted = (value: boolean) => {
    this.isStarted = value;
  };

  // OTHERS

  runStartTimer = () => {
    if (!this.startInterval) {
      this.startInterval = setInterval(() => {
        this.setStartTimer();
      }, 1000);
    }
  };

  runSpeechTimer = () => {
    if (this.speechInterval) {
      this.speechTimer = 0;
      return;
    }

    this.speechInterval = setInterval(() => {
      this.setSpeechTimer();
    }, 1000);
  };

  startVoiceRecognition = async (changeGeoModalVisibility: () => void) => {
    if (this.isStarted) {
      await this.stopRecognizing();
      return;
    }

    await this.startRecognizing();
    this.runStartTimer();
  };

  stopVoiceRecognition = () => {
    const shouldStopVoiceRecognition = VoiceHelper.shouldStopVoiceRecognition(
      this.isStarted,
      this.startInterval,
      this.startTimer,
      this.speechInterval,
      this.speechTimer,
    );

    if (shouldStopVoiceRecognition) {
      this.stopRecognizing();
    }
  };

  // RESET

  resetVoiceRecognition = async () => {
    await Voice.destroy();
    Voice.removeAllListeners();
    this.resetVoiceData();
  };

  private resetVoiceData = () => {
    this.isStarted = false;
    this.isSpeechRecognized = false;
    this.speechError = null;
    this.speechVolume = null;
    this.speechResults = [];
    this.speechPartialResults = [];

    this.resetStartInterval();
    this.resetSpeechInterval();
  };

  private resetSpeechInterval = () => {
    if (this.speechInterval) {
      clearInterval(this.speechInterval);
    }

    this.speechTimer = 0;
    this.speechInterval = null;
  };

  private resetStartInterval = () => {
    if (this.startInterval) {
      clearInterval(this.startInterval);
    }

    this.startTimer = 0;
    this.startInterval = null;
  };
}
