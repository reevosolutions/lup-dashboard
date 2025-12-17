import Dexie, { Table } from "dexie";
import EncryptionManager from "@lib/encryption-manager";

// Interface for the stored object in IndexedDB
export interface CacheEntry {
  key: string;
  value: string; // Encrypted string
  timestamp: number;
  expiry?: number; // Optional expiry timestamp
}

/**
 * LevelupDatabase
 * 
 * Extends Dexie to define the database schema.
 */
export class LevelupDatabase extends Dexie {
  storeCache!: Table<CacheEntry, string>;

  constructor() {
    super("LevelupDashboardDB");
    
    // Define schema
    // key: primary key
    // timestamp: for sorting/cleanup
    this.version(1).stores({
      storeCache: "key, timestamp" 
    });
  }
}

/**
 * DexieAdapter
 * 
 * Adapter pattern to interact with IndexedDB using Dexie.
 * Handles encryption/decryption transparently.
 */
export class DexieAdapter {
  private db: LevelupDatabase;
  private static instance: DexieAdapter;  
  private encryptionManager: EncryptionManager;

  private constructor() {
    this.db = new LevelupDatabase();
    this.encryptionManager = EncryptionManager.getInstance();
  }

  public static getInstance(): DexieAdapter {
    if (!DexieAdapter.instance) {
      DexieAdapter.instance = new DexieAdapter();
    }
    return DexieAdapter.instance;
  }

  /**
   * Save an item to IndexedDB with encryption
   * @param key Unique key for the item
   * @param value The data to store
   * @param ttl Time to live in milliseconds (optional)
   */
  public async setItem(key: string, value: any, ttl?: number): Promise<void> {
    const encryptedValue = this.encryptionManager.encrypt(value);
    if (!encryptedValue) {
        console.warn(`[DexieAdapter] Failed to encrypt value for key: ${key}`);
        return;
    }

    const entry: CacheEntry = {
      key,
      value: encryptedValue,
      timestamp: Date.now(),
    };

    if (ttl) {
        entry.expiry = Date.now() + ttl;
    }

    await this.db.storeCache.put(entry);
  }

  /**
   * Retrieve an item from IndexedDB and decrypt it
   * @param key Unique key for the item
   */
  public async getItem<T>(key: string): Promise<T | null> {
    const entry = await this.db.storeCache.get(key);
    
    if (!entry) return null;

    // Check for expiry
    if (entry.expiry && Date.now() > entry.expiry) {
        await this.removeItem(key);
        return null;
    }

    return this.encryptionManager.decrypt<T>(entry.value);
  }

  /**
   * Remove an item by key
   */
  public async removeItem(key: string): Promise<void> {
    await this.db.storeCache.delete(key);
  }

  /**
   * Clear all items in the cache
   */
  public async clear(): Promise<void> {
    await this.db.storeCache.clear();
  }

  /**
   * Get metadata for DevTools or debugging
   */
  public async getStats() {
    const count = await this.db.storeCache.count();
    const allKeys = await this.db.storeCache.toCollection().primaryKeys();
    return { count, keys: allKeys };
  }
}

export default DexieAdapter;
