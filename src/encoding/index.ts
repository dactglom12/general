import { getCodePoint, getLetters } from "../utils/stringUtils";
import { Encoder } from "./Encoder";
import { Encoding } from "./interfaces";

const string = "hey there!";

const utf8Representation = Encoder.encode(string, {
  base: 16,
});

const base64Representation = Encoder.encode(string, {
  format: Encoding.Formats.Base64,
});
