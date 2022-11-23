import { isEmpty } from '../base/utils/baseUtil';

export default class DebounceHelper {
  static debounce = (timer: ReturnType<typeof setTimeout> | undefined, action: () => void, timeout: number = 300) => {
    if (!isEmpty(timer)) {
      clearTimeout(timer!);
    }

    return setTimeout(() => {
      action();
    }, timeout);
  };
}
