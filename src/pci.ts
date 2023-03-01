import { createMessage, encrypt, readKey } from "openpgp";
import getPCIPublicKey from "./circle/getPCIPublicKey";

// Object to be encrypted
interface CardDetails {
  number?: string; // required when storing card details
  cvv?: string; // required when cardVerification is set to cvv
}

// Encrypted result
interface EncryptedValue {
  encryptedData: string;
  keyId: string;
}

// const pciEncryptionKey = await getPCIPublicKey();

/**
 * Encrypt card data function
 */
export default async function (
  dataToEncrypt: CardDetails
): Promise<EncryptedValue> {
  throw new Error();
  // const decodedPublicKey = await readKey({ armoredKey: atob(publicKey) });
  // const message = await createMessage({ text: JSON.stringify(dataToEncrypt) });
  // return encrypt({
  //   message,
  //   encryptionKeys: decodedPublicKey,
  // }).then((ciphertext) => {
  //   return {
  //     encryptedMessage: btoa(ciphertext),
  //     keyId,
  //   };
  // });
}
