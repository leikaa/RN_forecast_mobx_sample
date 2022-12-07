import { appConfig } from '../../../appConfig';
import { Nullable } from '../../../base/types/BaseTypes';
import { isTrue } from '../../../base/utils/baseUtil';

export default class VoiceHelper {
  static shouldStopVoiceRecognition = (
    isStarted: boolean,
    startInterval: Nullable<ReturnType<typeof setInterval>>,
    startTimer: number,
    speechInterval: Nullable<ReturnType<typeof setInterval>>,
    speechTimer: number,
  ) => {
    return isTrue(
      (isStarted && !speechInterval && startInterval && startTimer === appConfig.voiceRecognition.stopAfterIDLETimer) ||
        (isStarted && speechInterval && speechTimer === appConfig.voiceRecognition.stopAfterSpeechTimer),
    );
  };
}
