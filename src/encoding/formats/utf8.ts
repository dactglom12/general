import { getCodePoint, getLetters } from "../../utils/stringUtils";
import { Encoding } from "../interfaces";

export class UTF8 extends Encoding.Format {
  static encode(str: string, options?: Encoding.Options): string {
    return getLetters(str)
      .reduce((result, letter) => {
        const codePoint = getCodePoint(letter);

        const utfRepresentation = UTF8.getOctetsRepresentation(
          codePoint,
          options.base
        ).join(" ");

        return result.concat(`${utfRepresentation} `);
      }, "")
      .slice(0, -1);
  }

  private static getOctetsRepresentation(
    codePoint: number,
    base = 10
  ): string[] {
    const octetsNumber = UTF8.getOctetsNumber(codePoint);

    const initialOctets = {
      b1: null,
      b2: null,
      b3: null,
      b4: null,
    };

    let resultOctets;

    if (octetsNumber === 1) {
      resultOctets = {
        ...initialOctets,
        b1: ((codePoint >> 0) & 0x7f) | 0x00,
      };
    }

    if (octetsNumber === 2) {
      resultOctets = {
        ...initialOctets,
        // take 5 bits and make conjuction with 000 11111 and then disjunction with 110 00000
        b1: ((codePoint >> 6) & 0x1f) | 0xc0,
        b2: ((codePoint >> 0) & 0x3f) | 0x80,
      };
    }

    if (octetsNumber === 3) {
      resultOctets = {
        ...initialOctets,
        b1: ((codePoint >> 12) & 0xf) | 0xe0,
        b2: ((codePoint >> 6) & 0x3f) | 0x80,
        b3: ((codePoint >> 0) & 0x3f) | 0x80,
      };
    }

    if (octetsNumber === 4) {
      resultOctets = {
        b1: ((codePoint >> 18) & 0x7) | 0xf0,
        // 0x3f => 00 111111 (to take unicode symbol bits)
        // 0x80 => 10 000000 (to take UTF-8 continuation byte's prefix)
        b2: ((codePoint >> 12) & 0x3f) | 0x80,
        b3: ((codePoint >> 6) & 0x3f) | 0x80,
        b4: ((codePoint >> 0) & 0x3f) | 0x80,
      };
    }

    return Object.values(resultOctets)
      .filter((octet) => octet !== null)
      .map((octet) => {
        const typed = octet as number;

        return typed.toString(base);
      }) as string[];
  }

  private static getOctetsNumber(codePoint: number): number {
    if ((codePoint & 0xffffff80) === 0) return 1;
    if ((codePoint & 0xfffff800) === 0) return 2;
    if ((codePoint & 0xffff0000) === 0) return 3;
    if ((codePoint & 0xffe00000) === 0) return 4;
  }
}
