import { AxiosRequestConfig, AxiosResponse } from 'axios';

export default class Log {
  static d = (...args: any[]) => {
    if (__DEV__) {
      console.log.apply(this, args);
    }
  };

  static i = (...args: any[]) => {
    if (__DEV__) {
      console.log.apply(this, [
        '%c INFO %c ',
        'background: #6ebf1d; color: #0f1314; font-weight: 600',
        'color: #0f1314;',
        ...args,
      ]);
    }
  };

  static e = (...args: any[]) => {
    if (__DEV__) {
      console.log.apply(this, [
        '%c ERROR %c ',
        'background: #e63209; color: #0f1314; font-weight: 600',
        'color: #0f1314;',
        ...args,
      ]);
    }
  };

  static res = (response: AxiosResponse) => {
    if (__DEV__) {
      console.log(
        `%c RESPONSE %c ${response?.config?.url} `,
        'background: #42f5a4; color: #0f1314; font-weight: 600',
        'background: #2cb878; color: #0f1314;',
        response,
      );
    }
  };

  static resE = (response: AxiosResponse) => {
    if (__DEV__) {
      console.log(
        `%c RESPONSE ERROR %c ${response?.config?.url || response} `,
        'background: #ff3333; color: #0f1314; font-weight: 600',
        'background: #ff0000; color: #0f1314;',
        response,
      );
    }
  };

  static req = (config: AxiosRequestConfig) => {
    if (__DEV__) {
      console.log(
        `%c REQUEST %c ${config.url} `,
        'background: #03adfc; color: #0f1314; font-weight: 600',
        'background: #246ed4; color: #0f1314',
        { url: `${config.url}`, ...config },
      );
    }
  };
}
