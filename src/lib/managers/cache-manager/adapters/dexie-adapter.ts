import Dexie, { Table } from "dexie";
import EncryptionManager from "@lib/managers/encryption-manager";

// Interface for the stored object in IndexedDB
export interface CacheEntry {
  key: string;
  value: string; // Encrypted string
  timestamp: number;
  expiry?: number; // Optional expiry timestamp
}

export type LevelupAuthEntityType = "original_user" | "user" | "app" | "config" | "company" | "store" | "stores" | "office" | "warehouse";
export type AuthEntityType = LevelupAuthEntityType;

export type AuthEntity<E extends AuthEntityType> = E extends "config"
  ? Levelup.V2.Accounts.Entity.AccountConfiguration & { entity?: "config" }
  : E extends "user"
    ? Levelup.V2.Users.Entity.ExposedUser & { entity?: "user" }
    : E extends "original_user"
      ? {
          token: string;
          refresh_token: string;
          user: Levelup.V2.Users.Entity.ExposedUser & { entity?: "user" };
          entity?: "original_user";
        }
      : E extends "app"
        ? Levelup.V2.System.Entity.App & { entity?: "app" }
        : E extends "company"
          ? Levelup.V2.Accounts.Entity.Company & { entity?: "company" }
          : E extends "stores"
            ? {
                stores: Levelup.V2.Accounts.Entity.Store[];
                entity?: "stores";
              }
            : E extends "store"
              ? Levelup.V2.Accounts.Entity.Store & { entity?: "store" }
              : E extends "office"
                ? Levelup.V2.Logistics.Entity.Office & { entity?: "office" }
                : E extends "warehouse"
                  ? Levelup.V2.Logistics.Entity.Warehouse & { entity?: "warehouse" }
                  : never;

type WithEntityKey<T> = T & { entity: AuthEntityType };

export type LevelupAuthEntityDatum =
  | WithEntityKey<Levelup.V2.Accounts.Entity.AccountConfiguration>
  | WithEntityKey<Levelup.V2.Users.Entity.ExposedUser>
  | WithEntityKey<{
      token: string;
      refresh_token: string;
      user: Levelup.V2.Users.Entity.ExposedUser & { entity?: "user" };
    }>
  | WithEntityKey<Levelup.V2.System.Entity.App>
  | WithEntityKey<Levelup.V2.Accounts.Entity.Company>
  | WithEntityKey<Levelup.V2.Accounts.Entity.Store>
  | WithEntityKey<{
      stores: Levelup.V2.Accounts.Entity.Store[];
    }>
  | WithEntityKey<Levelup.V2.Logistics.Entity.Office>
  | WithEntityKey<Levelup.V2.Logistics.Entity.Warehouse>;

export type AuthEntityDatum = LevelupAuthEntityDatum;

/**
 * LevelupDatabase
 * 
 * Extends Dexie to define the database schema.
 */
export class LevelupDatabase extends Dexie {
  storeCache!: Table<CacheEntry, string>;

  // auth
  current!: Dexie.Table<AuthEntityDatum, AuthEntityType>;
  roles!: Dexie.Table<Levelup.V2.Auth.Entity.Role, string>;
  permissions!: Dexie.Table<Levelup.V2.Auth.Entity.Permission, string>;
  // system
  apps!: Dexie.Table<Levelup.V2.System.Entity.App, string>;
  // accounts
  companies!: Dexie.Table<Levelup.V2.Accounts.Entity.Company, string>;
  stores!: Dexie.Table<Levelup.V2.Accounts.Entity.Store, string>;
  // users
  users!: Dexie.Table<Levelup.V2.Users.Entity.ExposedUser, string>;
  // logistics
  offices!: Dexie.Table<Levelup.V2.Logistics.Entity.Office, string>;
  warehouses!: Dexie.Table<Levelup.V2.Logistics.Entity.Warehouse, string>;
  vehicles!: Dexie.Table<Levelup.V2.Logistics.Entity.Vehicle, string>;
  vehicleTypes!: Dexie.Table<Levelup.V2.Logistics.Entity.VehicleType, string>;
  // locations
  cities!: Dexie.Table<Levelup.V2.Locations.Entity.City, string>;
  states!: Dexie.Table<Levelup.V2.Locations.Entity.State, string>;
  countries!: Dexie.Table<Levelup.V2.Locations.Entity.Country, string>;
  // products
  products!: Dexie.Table<Levelup.V2.Products.Entity.Product, string>;
  productCategories!: Dexie.Table<Levelup.V2.Products.Entity.ProductCategory, string>;

  constructor() {
    super("LevelupDashboardDB");
    
    // Define schema
    // key: primary key
    // timestamp: for sorting/cleanup
    this.version(1).stores({
      storeCache: "key, timestamp",
      // auth
      current: "&entity",
      roles: "&_id, name, group, company, app",
      permissions: "&_id, name, company, app",
      // system
      apps: "&_id, tracking_id, code, name",
      // accounts
      companies: "&_id, tracking_id, code, name, app",
      stores: "&_id, tracking_id, code, name, company, app",
      // users
      users: "&_id, tracking_id, code, name, company, app",
      // logistics
      offices: "&_id, tracking_id, code, name, company, app",
      warehouses: "&_id, tracking_id, code, name, company, app",
      vehicles: "&_id, tracking_id, code, name, type_id, type_code, company, app",
      vehicleTypes: "&_id, tracking_id, code, name, company, app",
      // locations
      countries: "&code, _id, name, company, app",
      states: "&code, _id, name, country_code, country_id, company, app",
      cities: "&code, _id, name, state_code, state_id, country_code, country_id, company, app",
      // products
      products: "&_id, tracking_id, name, company, app, store, category",
      productCategories: "&_id, tracking_id, name, company, app, store",
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
  public db: LevelupDatabase;
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
    const encryptedValue = await this.encryptionManager.encrypt(value);
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
