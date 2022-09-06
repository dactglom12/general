import { Base64 } from './formats/base64';
import { UTF8 } from './formats/utf8';
import { Encoding } from './interfaces';

export const formats = {
  [Encoding.Formats.UTF8]: UTF8,
  [Encoding.Formats.Base64]: Base64,
};

export const threeBytesBitSequenceLength = 24;
export const oneByteLengthInBits = 8;

const englishAlphabetLowercase = 'abcdefghijklmnopqrstuvwxyz';
const englishAlphabetUppercase = englishAlphabetLowercase.toUpperCase();
const numbersString = '0123456789';
const plus = '+';
const forwardSlash = '/';

const base64AlphabetString = `${englishAlphabetUppercase}${englishAlphabetLowercase}${numbersString}${plus}${forwardSlash}`;
export const base64AlphabetObject = base64AlphabetString
  .split('')
  .reduce((obj, symbol, index) => {
    obj[index] = symbol;
    return obj;
  }, {});
