import {
  getBitSequenceWithAppendedZeroes,
  getBytes,
  getCodePoint,
  getLetters,
  getValidBitSequence,
  isLastElement,
} from '../../utils/stringUtils';
import {
  base64AlphabetObject,
  oneByteLengthInBits,
  threeBytesBitSequenceLength,
} from '../constants';
import { Encoding } from '../interfaces';

export class Base64 extends Encoding.Format {
  static encode(str: string, options?: Encoding.Options): string {
    let result = '';
    // continuation bits string
    // it gets concatenated with letter's bit representation
    // if it is longer than 24 -> calculate base64 for 24 bits and save rest
    let sequence = '';

    getLetters(str).forEach((letter, index, arr) => {
      const codePoint = getCodePoint(letter);
      const bits = codePoint.toString(2);

      sequence += getValidBitSequence(bits, Base64.getBitsValidationBase(bits));

      const bytes = getBytes(sequence);

      if (isLastElement(arr, index) && bytes < 3) {
        const toEncode = getBitSequenceWithAppendedZeroes(
          sequence,
          threeBytesBitSequenceLength,
        );

        result += Base64.getBase64Code(toEncode);
      }

      if (bytes > 2) {
        // more than 3 bytes
        if (bytes > 3) {
          const toEncode = sequence.slice(0, threeBytesBitSequenceLength);

          result += Base64.getBase64Code(toEncode);

          sequence = sequence.slice(threeBytesBitSequenceLength);
        }
        // 3 bytes
        else {
          const toEncode = getBitSequenceWithAppendedZeroes(
            sequence,
            threeBytesBitSequenceLength,
          );

          sequence = '';

          result += Base64.getBase64Code(toEncode);
        }
      }
    });

    return result;
  }

  private static getBase64Code(bits: string): string {
    if (bits.length !== threeBytesBitSequenceLength) {
      throw new Error('Three bytes are expected');
    }

    const chunks = [
      Base64.getChunk(bits, 0, 6),
      Base64.getChunk(bits, 6, 12),
      Base64.getChunk(bits, 12, 18),
      Base64.getChunk(bits, 18),
    ];

    return chunks.reduce((result, chunk) => {
      const isFullZeroSequence = chunk.indexOf('1') === -1;

      if (isFullZeroSequence) {
        return result + '=';
      }

      const position = parseInt(chunk, 2);

      return result + base64AlphabetObject[position];
    }, '');
  }

  private static getChunk(bits: string, start: number, end?: number) {
    return bits.slice(start, end);
  }

  private static getBitsValidationBase(bits: string) {
    return getBytes(bits) * oneByteLengthInBits;
  }
}
