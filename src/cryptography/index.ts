import elliptic from "elliptic";
import CryptoJS from "crypto-js";

const testInputData = {
  t: "ЫЫЫЫЫЫЫЫЫЫЫЫЫЫЫ",
  name: "Volodymyr",
  surname: "Molchanov",
  sensitivePassword: "А такую кодировку?",
};

const EC = elliptic.ec;
const mockAuthToken = "some_random_token";
const mockProtocolId = "0.0.1";
const mockServiceKeyPairId = "214125125";

class Encoder {
  private static EC = new EC("secp256k1");

  private static getByteArray(input: any) {
    const stringifiedValue = JSON.stringify(input);
    const textEncoder = new TextEncoder();
    const encoded = textEncoder.encode(stringifiedValue);
    console.log(encoded);
    return encoded;
  }

  private static getGeneratedSecureRandomNumbers(length: number) {
    const buffer = new ArrayBuffer(length);
    const byteArray = new Uint8Array(buffer);

    return window.crypto.getRandomValues(byteArray);
  }

  private static parseByteArray(array: Uint8Array, start: number, end: number) {
    return array.slice(start, end);
  }

  private static getCryptoValues(secureRandomNumbers: Uint8Array) {
    return {
      clientPrivateKeyByteArray: Encoder.parseByteArray(
        secureRandomNumbers,
        0,
        32
      ),
      dataEncryptionKey: Encoder.parseByteArray(secureRandomNumbers, 32, 64),
      dataEncryptionInitVector: Encoder.parseByteArray(
        secureRandomNumbers,
        64,
        80
      ),
      macKey: Encoder.parseByteArray(secureRandomNumbers, 80, 112),
      keyEncryptionInitVector: Encoder.parseByteArray(
        secureRandomNumbers,
        112,
        128
      ),
    };
  }

  private static getServiceKeyPair(protocolId: string) {
    // hex
    const hardcodedServicePublicKey =
      "04d81490cae828c9270f6e9f4c0a13d6a4ff62c258ca69042315857ce0d0899322c38dc11cc26cb06d4e78b11b658b67fa1b6eb5f2c78579aea3e4bf229e14e5fa";
    const keyPair = Encoder.EC.keyFromPublic(hardcodedServicePublicKey, "hex");
    console.log(keyPair.validate());

    return {
      privateKey: null,
      publicKey: hardcodedServicePublicKey,
      keyPair,
      keyPairId: mockServiceKeyPairId,
    };
  }

  private static getClientKeyPair(privateKeyByteArray: Uint8Array) {
    const keyPair = Encoder.EC.keyFromPrivate(privateKeyByteArray, "hex");
    const privateKey = keyPair.getPrivate().toString("hex");
    const publicKey = keyPair.getPublic().encode("hex", false);

    return {
      privateKey,
      publicKey,
      keyPair,
    };
  }

  // raw payload should be byte array
  private static getRawPayload(rawData: Uint8Array, token: string) {
    return {
      data: rawData.toString(),
      token,
    };
  }

  private static encryptAES(
    data: string,
    options: { key: string; vector: string }
  ) {
    const keyWordArray = CryptoJS.enc.Utf8.parse(options.key);
    const vectorWordArray = CryptoJS.enc.Utf8.parse(options.vector);

    const ciphered = CryptoJS.AES.encrypt(data, keyWordArray, {
      iv: vectorWordArray,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return ciphered;
  }

  private static getSharedSecret(
    clientKeyPair: elliptic.ec.KeyPair,
    serviceKeyPair: elliptic.ec.KeyPair
  ) {
    return clientKeyPair.derive(serviceKeyPair.getPublic());
  }

  public static async getEncodedValue(input: any) {
    const rawSensitiveData = Encoder.getByteArray(input);
    const serviceKeyPair = Encoder.getServiceKeyPair(mockProtocolId);
    const secureRandomNumbers = Encoder.getGeneratedSecureRandomNumbers(128);
    const {
      clientPrivateKeyByteArray,
      dataEncryptionInitVector,
      dataEncryptionKey,
      keyEncryptionInitVector,
      macKey,
    } = Encoder.getCryptoValues(secureRandomNumbers);
    const clientKeyPair = Encoder.getClientKeyPair(clientPrivateKeyByteArray);
    const payload = Encoder.getRawPayload(rawSensitiveData, mockAuthToken);
    const encryptedPayload = Encoder.encryptAES(JSON.stringify(payload), {
      key: dataEncryptionKey.toString(),
      vector: dataEncryptionInitVector.toString(),
    });
    const sharedSecret = Encoder.getSharedSecret(
      clientKeyPair.keyPair,
      serviceKeyPair.keyPair
    );
    const sharedSecretAESOptions = {
      key: sharedSecret.toString("hex"),
      vector: keyEncryptionInitVector.toString(),
    };
    const encryptedDataEncryptionKey = Encoder.encryptAES(
      dataEncryptionKey.toString(),
      sharedSecretAESOptions
    );
    const encryptedDataEncryptionInitVector = Encoder.encryptAES(
      dataEncryptionInitVector.toString(),
      sharedSecretAESOptions
    );
    const encryptedMacKey = Encoder.encryptAES(
      macKey.toString(),
      sharedSecretAESOptions
    );

    const requestDatagram = {
      protocolId: mockProtocolId,
      keyPairId: mockProtocolId,
      clientEphPubKey: clientKeyPair.publicKey,
      encryptedDataEncryptionKey: encryptedDataEncryptionKey.toString(
        CryptoJS.format.Hex
      ),
      encryptedDataEncryptionInitVector:
        encryptedDataEncryptionInitVector.toString(CryptoJS.format.Hex),
      encryptedMacKey: encryptedMacKey.toString(CryptoJS.format.Hex),
      encryptedPayload: encryptedPayload.toString(CryptoJS.format.Hex),
      keyEncryptionInitVector: keyEncryptionInitVector.toString(),
    };

    const requestDatagramSignature = CryptoJS.HmacSHA256(
      JSON.stringify(requestDatagram),
      macKey.toString()
    );

    return {
      ...requestDatagram,
      requestDatagramSignature: requestDatagramSignature.toString(
        CryptoJS.enc.Hex
      ),
    };
  }
}
