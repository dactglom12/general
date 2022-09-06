export namespace Encoding {
  export enum Formats {
    UTF8 = 'utf-8',
    Base64 = 'base64',
    Hex = 'hex',
  }

  export interface Options {
    base?: number;
    format?: Encoding.Formats;
  }

  export abstract class Format {
    static encode: (str: string, options?: Options) => string;
  }
}
