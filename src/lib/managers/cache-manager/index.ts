import DexieAdapter, { AuthEntity, AuthEntityType } from "./adapters/dexie-adapter";

/**
 * CacheManager
 * 
 * Central point for cache operations.
 * Currently delegates to DexieAdapter, but could support other strategies (memory, localStorage) in the future.
 */
export class CacheManager {
  private static instance: CacheManager;
  private adapter: DexieAdapter;

  private constructor() {
    this.adapter = DexieAdapter.getInstance();
  }

  public static getInstance(): CacheManager {
    if (!CacheManager.instance) {
      CacheManager.instance = new CacheManager();
    }
    return CacheManager.instance;
  }

  public getAdapter(): DexieAdapter {
    return this.adapter;
  }

  // Convenience methods delegating to adapter
  public async set(key: string, value: any, ttl?: number) {
    return this.adapter.setItem(key, value, ttl);
  }

  public async get<T>(key: string) {
    return this.adapter.getItem<T>(key);
  }

  public async remove(key: string) {
    return this.adapter.removeItem(key);
  }

  public async clear() {
    return this.adapter.clear();
  }

  /* -------------------------------------------------------------------------- */
  /*                                    AUTH                                    */
  /* -------------------------------------------------------------------------- */
  async getCurrentAuthObject<T extends AuthEntityType>(entity: T): Promise<AuthEntity<T> | null> {
    const item = await this.adapter.db.current.get(entity);
    return (item as AuthEntity<T>) || null;
  }

  async setCurrentAuthObject<T extends AuthEntityType>(entity: T, data: AuthEntity<T>) {
    await this.adapter.db.current.put({ ...data, entity });
  }

  async unsetCurrentAuthObject<T extends AuthEntityType>(entity: T) {
    await this.adapter.db.current.delete(entity);
  }

  async clearCurrentAuthData() {
    await this.adapter.db.current.clear();
  }
}

export default CacheManager;
