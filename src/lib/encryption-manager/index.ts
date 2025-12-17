import CryptoJS from "crypto-js";
import { config } from "@config/index";

/**
 * EncryptionManager
 * 
 * Handles encryption and decryption of sensitive data stored locally.
 * Uses AES encryption with a key derived from environment variables.
 * 
 * This class is a singleton to ensure consistent configuration.
 */
export class EncryptionManager {
  private static instance: EncryptionManager;
  private readonly SECRET_KEY: string;

  private constructor() {
    // Use a fallback key for development if env var is missing
    // In production, this should strictly come from env
    this.SECRET_KEY = config.app.security.localStorage.secret || "dev-fallback-secret-key-change-me";
  }

  public static getInstance(): EncryptionManager {
    if (!EncryptionManager.instance) {
      EncryptionManager.instance = new EncryptionManager();
    }
    return EncryptionManager.instance;
  }

  /**
   * Encrypts a value (string or object) into a ciphertext string.
   * @param value The value to encrypt
   * @returns The encrypted string or null if encryption fails
   */
  public encrypt(value: any): string | null {
    try {
      if (value === null || value === undefined) return null;
      
      // Convert object/number/boolean to string
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      
      return CryptoJS.AES.encrypt(stringValue, this.SECRET_KEY).toString();
    } catch (error) {
      console.error("[EncryptionManager] Encrypt failed:", error);
      return null;
    }
  }

  /**
   * Decrypts a ciphertext string back into its original type T.
   * @param ciphertext The encrypted string
   * @returns The decrypted value of type T or null if decryption fails
   */
  public decrypt<T>(ciphertext: string): T | null {
    try {
      if (!ciphertext) return null;
      
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.SECRET_KEY);
      const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
      
      if (!decryptedString) return null;

      try {
        // Try to parse as JSON (for objects, arrays, numbers, booleans)
        return JSON.parse(decryptedString) as T;
      } catch {
        // If parsing fails, return as string
        return decryptedString as unknown as T;
      }
    } catch (error) {
      console.error("[EncryptionManager] Decrypt failed:", error);
      return null;
    }
  }
}

export default EncryptionManager;
