import { config } from "@config/index";

export class EncryptionManager {
  static instance: EncryptionManager;
  private _keysGenerated = false;
  private _key!: CryptoKey;
  private _iv!: Uint8Array;

  static getInstance() {
    if (!this.instance) {
      this.instance = new EncryptionManager();
    }
    return this.instance;
  }

  private constructor() {
    // Generate a key
    this._generateIvAndKey()
      .then(() => {
        console.log('[EncryptionManager] Keys Generated');
      })
      .catch((e) => console.error('[EncryptionManager] Keys generation failed', e));
  }

  private async _generateIvAndKey() {
    if (typeof window === 'undefined') return;
    if (this._keysGenerated) return;
    
    const { secret, passphrase } = config.app.security.localStorage;
    const safePassphrase = passphrase || "dev-fallback-passphrase";
    const safeSecret = secret || "dev-fallback-secret";

    this._key = await this._stringToCryptoKey(safePassphrase);
    this._iv = this.stringToUint8Array(safeSecret);
    this._keysGenerated = true;
  }

  private async _stringToCryptoKey(passphrase: string): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passphraseBuffer = encoder.encode(passphrase);

    // Derive a key using the passphrase
    const key = await window.crypto.subtle.importKey(
      'raw',
      passphraseBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveKey', 'deriveBits']
    );

    // Export the derived key
    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: new Uint8Array(16), // Use a random salt
        iterations: 100000, // Adjust as needed for your security requirements
        hash: 'SHA-256',
      },
      key,
      { name: 'AES-GCM', length: 256 }, // Or other desired parameters
      true,
      ['encrypt', 'decrypt']
    );
  }

  stringToUint8Array(str: string): Uint8Array {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binary = String.fromCharCode.apply(
      null,
      Array.from(new Uint8Array(buffer))
    );
    return btoa(binary);
  }

  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const length = binaryString.length;
    const buffer = new ArrayBuffer(length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < length; i++) {
      view[i] = binaryString.charCodeAt(i);
    }
    return buffer;
  }

  public async encrypt(value: any): Promise<string | null> {
    try {
        if (value === null || value === undefined) return null;
        await this._generateIvAndKey();
        
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        const encoded = new TextEncoder().encode(stringValue);

        const encrypted = await window.crypto.subtle.encrypt(
        {
            name: 'AES-GCM',
            iv: this._iv as any,
        },
        this._key,
        encoded
        );

        return this.arrayBufferToBase64(encrypted);
    } catch (error) {
        console.error("[EncryptionManager] Encrypt failed:", error);
        return null;
    }
  }

  public async decrypt<T>(ciphertext: string): Promise<T | null> {
    try {
      if (!ciphertext) return null;
      await this._generateIvAndKey();
      
      const encryptedBuffer = this.base64ToArrayBuffer(ciphertext);

      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: this._iv as any,
        },
        this._key,
        encryptedBuffer
      );

      const decoded = new TextDecoder().decode(decrypted);
      
      try {
        return JSON.parse(decoded) as T;
      } catch {
        return decoded as unknown as T;
      }
    } catch (error) {
      console.error("[EncryptionManager] Decrypt failed:", error);
      return null;
    }
  }
}

export default EncryptionManager;
