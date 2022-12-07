import Voice, {
  SpeechEndEvent,
  SpeechErrorEvent,
  SpeechRecognizedEvent,
  SpeechResultsEvent,
  SpeechStartEvent,
  SpeechVolumeChangeEvent,
} from '@react-native-voice/voice';

import { appConfig } from '../../appConfig';
import { Nullable } from '../../base/types/BaseTypes';
import { isEmpty, isTrue } from '../../base/utils/baseUtil';
import VoiceFactory from './VoiceFactory';

export default class VoiceService {
  voiceFactory: VoiceFactory;

  constructor() {
    this.voiceFactory = new VoiceFactory();
  }

  // MAIN

  startRecognizing = async () => {
    try {
      await Voice.start(appConfig.forecast.lang);
    } catch (error) {}
  };

  stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (error) {}
  };

  // OTHERS

  prepareSpeechResults = (e: SpeechResultsEvent): string[] => {
    return e?.value ? e.value : [];
  };

  prepareIsStarted = (e: SpeechStartEvent | SpeechEndEvent): boolean => {
    return !e?.error;
  };

  prepareIsSpeechRecognized = (e: SpeechRecognizedEvent): boolean => {
    return isTrue(e?.isFinal);
  };

  prepareSpeechVolume = (e: SpeechVolumeChangeEvent): Nullable<number> => {
    return !isEmpty(e?.value) ? e.value! : null;
  };

  prepareSpeechError = (e: SpeechErrorEvent): Nullable<string> => {
    return e?.error ? JSON.stringify(e.error) : null;
  };
}
