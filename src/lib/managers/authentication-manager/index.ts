/* eslint-disable @typescript-eslint/no-unused-vars */
import { initSdkForClient } from "@lib/init-sdk";
import CacheManager from "@lib/managers/cache-manager";
import EncryptionManager from "@lib/managers/encryption-manager";
import LevelupSdk from "levelup-sdk";
import { userHasRoleGroupOrAbove } from "@lib/utils";

export default class AuthenticationManager {
  cache: CacheManager;
  crypto: EncryptionManager;
  sdk: LevelupSdk;
  static instance: AuthenticationManager;

  static getInstance() {
    if (!this.instance) {
      this.instance = new AuthenticationManager();
    }
    return this.instance;
  }

  private constructor() {
    /**
     * Init Cache Manager
     */
    this.cache = CacheManager.getInstance();

    /**
     * Init Encryption Manager
     */
    this.crypto = EncryptionManager.getInstance();

    /**
     * Init SDK
     */
    this.sdk = initSdkForClient();
  }

  async saveAccessToken(token: string) {
    const encryptedToken = await this.crypto.encrypt(token);
    if (encryptedToken) {
      window?.localStorage.setItem("token", encryptedToken);
    }
  }
  async loadAccessToken() {
    const encryptedToken = window?.localStorage.getItem("token") || null;
    if (!encryptedToken) return null;
    return this.crypto.decrypt(encryptedToken);
  }
  async saveRefreshToken(token: string) {
    const encryptedToken = await this.crypto.encrypt(token);
    if (encryptedToken) {
      window?.localStorage.setItem("refresh.token", encryptedToken);
    }
  }

  async loadRefreshToken() {
    const encryptedToken = window?.localStorage.getItem("refresh.token") || null;
    if (!encryptedToken) return null;
    return this.crypto.decrypt(encryptedToken);
  }

  async clearTokens() {
    window?.localStorage.removeItem("token");
    window?.localStorage.removeItem("refresh.token");
  }

  async switchToOriginalUser() {
    const original_user = await this.cache.getCurrentAuthObject("original_user");
    if (!original_user) return;
    return await this.authenticate(original_user);
  }

  async authenticate({ user, token, refresh_token }: Levelup.V2.Utils.NonUndefined<Levelup.V2.Auth.Api.Auth.Signin.Response["data"]>) {
    const result: {
      isAuthenticated: boolean;
      user: Levelup.V2.Users.Entity.ExposedUser | null;
      original_user: Levelup.V2.Users.Entity.ExposedUser | null;
      app: Levelup.V2.System.Entity.App | null;
      company: Levelup.V2.Accounts.Entity.Company | null;
      office: Levelup.V2.Logistics.Entity.Office | null;
      store: Levelup.V2.Accounts.Entity.Store | null;
      config: Levelup.V2.Accounts.Entity.AccountConfiguration | null;
      status: "idle" | "failed";
    } = {
      isAuthenticated: false,
      original_user: null,
      user: null,
      app: null,
      company: null,
      office: null,
      store: null,
      config: null,
      status: "idle",
    };
    try {
      // token
      const old_token = await this.loadAccessToken();
      const old_refresh_token = await this.loadRefreshToken();
      console.log("_authenticate", "comparing tokens", {
        old_token,
        token,
        old_refresh_token,
        refresh_token,
      });

      await this.saveAccessToken(token);
      await this.saveRefreshToken(refresh_token);

      const original_user = await this.cache.getCurrentAuthObject("user");
      console.log("_authenticate", "user", { user, original_user });
      if (original_user && original_user.role_group === "master") {
        console.log("_authenticate", "YES ITS A MASTER");
        const original_user_object = await (async () => ({
          token: old_token as string,
          refresh_token: old_refresh_token as string,
          user: original_user,
        }))();
        await this.cache.setCurrentAuthObject("original_user", original_user_object);
        result.original_user = original_user;
      }

      // user
      await this.cache.setCurrentAuthObject("user", user);
      // app
      if (user.app) result.app = ((await this.sdk.system.apps.getById("current")).data as Levelup.V2.Utils.NonUndefined<typeof result.app>) || null;
      if (result.app) await this.cache.setCurrentAuthObject("app", result.app);
      else this.cache.unsetCurrentAuthObject("app");

      if (user.role_group === "master") {
        this.cache.unsetCurrentAuthObject("original_user");
      }

      // company
      if (user.company)
        result.company = ((await this.sdk.accounts.companies.getById("current")).data as Levelup.V2.Utils.NonUndefined<typeof result.company>) || null;
      if (result.company) await this.cache.setCurrentAuthObject("company", result.company);
      else this.cache.unsetCurrentAuthObject("company");

      // office
      if (
        user.attributes?.multi_office_user?.is_related_to_offices &&
        (user.attributes?.multi_office_user?.last_managed_office || user.attributes?.multi_office_user?.subscribed_at_office)
      )
        result.office =
          (
            await this.sdk.logistics.offices.getById(
              (user.attributes?.multi_office_user?.last_managed_office || user.attributes?.multi_office_user?.subscribed_at_office) as string
            )
          ).data || null;
      if (result.office) await this.cache.setCurrentAuthObject("office", result.office);
      else this.cache.unsetCurrentAuthObject("office");

      // stores
      const store_ids = user.role_group === "sellers" ? user.attributes?.seller?.stores || [] : [];
      let stores: Levelup.V2.Accounts.Entity.Store[] = [];
      if (store_ids) stores = store_ids.length ? (await this.sdk.accounts.stores.list({ count: -1 })).data || [] : [];
      if (stores.length) {
        await this.cache.setCurrentAuthObject("stores", { stores });
        const store = user.attributes?.seller?.last_managed_store
          ? stores.find((s) => s._id === user.attributes?.seller?.last_managed_store) || stores[0]
          : stores[0];
        await this.cache.setCurrentAuthObject("store", store);
      } else {
        this.cache.unsetCurrentAuthObject("stores");
        this.cache.unsetCurrentAuthObject("store");
      }

      //
      const { data: config } = await this.sdk.accounts.config.get();
      if (config) {
        result.config = config;
        await this.cache.setCurrentAuthObject("config", config);
      }
      result.user = user;
      result.isAuthenticated = true;
      result.status = "idle";
    } catch (error) {
      console.error("_authenticate", "error", error);
      result.status = "failed";
    }

    return result;
  }

  get user(): Promise<Levelup.V2.Users.Entity.ExposedUser | null> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.cache.getCurrentAuthObject("user");
        resolve(user);
      } catch (error) {
        reject(null);
      }
    });
  }

  get isAuthenticated(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await this.cache.getCurrentAuthObject("user");
        resolve(!!user);
      } catch (error) {
        reject(false);
      }
    });
  }

  async logout() {
    try {
      this.clearTokens();
      await this.cache.clearCurrentAuthData();
    } catch (error) {}
  }

  async getAuthData(): Promise<{
    isAuthenticated: boolean;
    original_user: Levelup.V2.Users.Entity.ExposedUser | null;
    user: Levelup.V2.Users.Entity.ExposedUser | null;
    app: Levelup.V2.System.Entity.App | null;
    company: Levelup.V2.Accounts.Entity.Company | null;
    office: Levelup.V2.Logistics.Entity.Office | null;
    store: Levelup.V2.Accounts.Entity.Store | null;
    config: Levelup.V2.Accounts.Entity.AccountConfiguration | null;
  }> {
    const user = await this.cache.getCurrentAuthObject("user");
    const original_user = await this.cache.getCurrentAuthObject("original_user");
    const store = await this.cache.getCurrentAuthObject("store");
    const office = await this.cache.getCurrentAuthObject("office");
    const company = await this.cache.getCurrentAuthObject("company");
    const app = await this.cache.getCurrentAuthObject("app");
    const config = await this.cache.getCurrentAuthObject("config");
    return {
      isAuthenticated: !!user,
      user,
      original_user: original_user?.user || null,
      app,
      company,
      office,
      store,
      config,
    };
  }

  async setCurrentStore(store: Levelup.V2.Accounts.Entity.Store): Promise<Levelup.V2.Accounts.Entity.AccountConfiguration | undefined> {
    const user = await this.cache.getCurrentAuthObject("user");
    if (!user) throw new Error("User not found");
    if (user.role_group !== "sellers") throw new Error("User is not a seller");
    if (user.attributes?.seller?.stores?.includes(store._id)) {
      await this.cache.setCurrentAuthObject("store", store);
      await this.sdk.auth.users.setLastManagedStore(store._id);
      await this.cache.setCurrentAuthObject("user", {
        ...user,
        attributes: {
          ...user.attributes,
          seller: {
            ...user.attributes?.seller,
            last_managed_store: store._id,
          },
        },
      });
      const config = await this.loadCurrentUserConfig();
      return config;
    }
    throw new Error("User is not allowed to manage this store");
  }

  async setCurrentOffice(office: Levelup.V2.Logistics.Entity.Office | null): Promise<Levelup.V2.Accounts.Entity.AccountConfiguration | undefined> {
    const user = await this.cache.getCurrentAuthObject("user");
    if (!user) throw new Error("User not found");
    if (!userHasRoleGroupOrAbove(user.role_group, "agents")) throw new Error("User is not an agent or administrator");
    if (!office) {
      await this.cache.unsetCurrentAuthObject("office");
      await this.cache.setCurrentAuthObject("user", {
        ...user,
        attributes: {
          ...user.attributes,
          multi_office_user: {
            ...user.attributes?.multi_office_user,
            last_managed_office: null,
          },
        },
      });
      const config = await this.loadCurrentUserConfig();
      return config;
    }
    const managed_offices = [...(user.attributes?.multi_office_user?.managed_offices || []), user.attributes?.multi_office_user?.subscribed_at_office].filter(
      (i) => !!i
    );
    if (
      !userHasRoleGroupOrAbove(user?.role_group, "company_administrators") &&
      !user.attributes?.multi_office_user?.can_manage_all_offices &&
      !managed_offices.includes(office?._id)
    ) {
      throw new Error("User is not allowed to manage this office");
    } else {
      await this.cache.setCurrentAuthObject("office", office);
      try {
        await this.sdk.auth.users.setLastManagedOffice(office._id);
      } catch (error) {}
      await this.cache.setCurrentAuthObject("user", {
        ...user,
        attributes: {
          ...user.attributes,
          multi_office_user: {
            ...user.attributes?.multi_office_user,
            last_managed_office: office._id,
          },
        },
      });
      const config = await this.loadCurrentUserConfig();
      return config;
    }
  }

  async loadCurrentUserConfig() {
    const { data: config } = await this.sdk.accounts.config.get();
    if (config) {
      await this.cache.setCurrentAuthObject("config", config);
      return config;
    }
  }

  async getUserStores(): Promise<Levelup.V2.Accounts.Entity.Store[]> {
    const user = await this.cache.getCurrentAuthObject("user");
    if (!user) throw new Error("User not found");
    if (user.role_group !== "sellers") return [];
    const stores = await this.cache.getCurrentAuthObject("stores");
    return stores?.stores || [];
  }

  isStoreManagedByUser(store_id: string, user: Levelup.V2.Users.Entity.ExposedUser | null): boolean {
    if (!user) return false;
    return user.attributes?.seller?.stores?.includes(store_id) || false;
  }

  isCompanyManagedByUser(company_id: string, user: Levelup.V2.Users.Entity.ExposedUser | null, user_company?: Levelup.V2.Accounts.Entity.Company): boolean {
    if (!user) return false;
    return user.company === company_id || user_company?.attributes?.companies?.includes(company_id) || false;
  }

  async updateCurrentUser(newUser: Levelup.V2.Users.Entity.ExposedUser) {
    const user = await this.cache.getCurrentAuthObject("user");
    if (!user) throw new Error("User not found");
    if (user._id !== newUser._id) throw new Error("Unauthorized");
    await this.cache.setCurrentAuthObject("user", newUser);
    const config = await this.loadCurrentUserConfig();
    return config;
  }
}
