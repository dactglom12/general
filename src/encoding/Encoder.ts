import { formats } from './constants';
import { Encoding } from './interfaces';

export class Encoder {
  static stringToBitSequence(str: string): string {
    const bits: string[] = [];

    for (let letter of str) {
      bits.push(letter.charCodeAt(0).toString(2));
    }

    return bits.join(' ');
  }

  static encode(str: string, options?: Encoding.Options) {
    const defaultFormat = Encoding.Formats.UTF8;

    return formats[options.format ?? defaultFormat].encode(str, options);
  }
}
