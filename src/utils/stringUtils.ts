import * as uuid from "uuid";

export const getLetters = (str: string) => str.split("");
export const getCodePoint = (letter: string) => letter.charCodeAt(0);
export const getValidBitSequence = (
  bitsSequence: string,
  desiredLength = 8
) => {
  if (bitsSequence.length >= desiredLength) {
    return bitsSequence;
  }

  const lackingZeroesLength = desiredLength - bitsSequence.length;
  const zeroesString = "0".repeat(lackingZeroesLength);

  return `${zeroesString}${bitsSequence}`;
};
export const getBitSequenceWithAppendedZeroes = (
  sequence: string,
  desiredLength = 8
) => {
  const zeroesString = "0".repeat(desiredLength - sequence.length);

  return `${sequence}${zeroesString}`;
};
export const getBytes = (bits: string) => Math.ceil(bits.length / 8);
export const isLastElement = (arr: Array<unknown>, currentIndex: number) =>
  arr.length - 1 === currentIndex;
export const generateRandomUUID = () => uuid.v4();
