import { AppSdk } from "@/sdk";
import { initSdkForClient } from "@lib/init-sdk";
import AuthenticationManager from "@lib/managers/authentication-manager";
import CacheManager from "@lib/managers/cache-manager";
import { applyOnChunkedArray } from "@lib/utils";

export default class AppConfigManager {
  static instance: AppConfigManager;
  cache!: CacheManager;
  sdk!: AppSdk;

  private _locationsData: {
    loaded: boolean;
    countries?: Levelup.V2.Locations.Entity.Country[] | undefined;
    states?: Levelup.V2.Locations.Entity.State[] | undefined;
    cities?: Levelup.V2.Locations.Entity.City[] | undefined;
    lastUpdated?: Date;
  } = {
      loaded: false,
    };

  private _acData: {
    loaded: boolean;
    lastUpdated?: Date;
    roles?: Levelup.V2.Auth.Entity.Role[] | undefined;
    permissions?: Levelup.V2.Auth.Entity.Permission[] | undefined;
  } = {
      loaded: false,
    };

  static getInstance() {
    if (!this.instance) {
      this.instance = new AppConfigManager();
    }
    return this.instance;
  }

  private constructor() {
    this.initialize();
  }

  private initialize() {
    /**
     * Init Cache Manager
     */
    this.cache = CacheManager.getInstance();

    /**
     * Init SDK
     */
    this.sdk = initSdkForClient();
  }

  private handleError(error: any) {
    console.error("Application Config Manager Error", error);
  }

  /* -------------------------------------------------------------------------- */
  /*                            Authentication cache data                            */
  /* -------------------------------------------------------------------------- */
  async loadAccessControlData(forceLoadFormServer = false) {
    try {
      console.log("Loading Authentication Data", { forceLoadFormServer });

      if (this._acData.loaded && !forceLoadFormServer) {
        console.log("Authentication data already loaded");
        return;
      }

      // roles
      let roles = !forceLoadFormServer
        ? await this.cache.getAdapter().db.roles.toArray()
        : [];
      if (roles?.length === 0) {
        console.log("roles data not found in cache, fetching from server");
        const response = await this.sdk.auth.roles.list({
          count: -1
        });
        roles = response.data;
        await applyOnChunkedArray(roles, 50, async array => {
          await this.cache.getAdapter().db.roles.bulkPut(array || []);
        });
        console.log("roles data loaded from server", roles?.length);
      }

      // permissions
      let permissions = !forceLoadFormServer
        ? await this.cache.getAdapter().db.permissions.toArray()
        : [];
      if (permissions?.length === 0) {
        console.log(
          "permissions data not found in cache, fetching from server",
        );
        // const response = await this.sdk.auth.permissions.list({
        //   count: -1,
        // })
        permissions = [];
        await applyOnChunkedArray(permissions, 50, async array => {
          await this.cache.getAdapter().db.permissions.bulkPut(array || []);
        });
        console.log(
          "permissions data loaded from server",
          permissions?.length,
        );
      }

      console.log("Authentication data loaded from cache");

      this._acData = {
        loaded: true,
        roles,
        permissions,
        lastUpdated: new Date(),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getAccessControlData(forceLoadFormServer = false) {
    const authManager = AuthenticationManager.getInstance();
    const isAuthenticated = await authManager.isAuthenticated;
    if (!isAuthenticated) return;
    await this.loadAccessControlData(forceLoadFormServer);
    return this._acData;
  }


  /* -------------------------------------------------------------------------- */
  /*                            Locations cache data                            */
  /* -------------------------------------------------------------------------- */
  async loadLocationsData(forceLoadFormServer = false) {
    try {
      console.log("Loading Locations Data", { forceLoadFormServer });

      if (this._locationsData.loaded && !forceLoadFormServer) {
        console.log("Locations data already loaded");
        return;
      }

      // countries
      let countries = !forceLoadFormServer ? await this.cache.getAdapter().db.countries.toArray() : [];
      if (countries?.length === 0) {
        console.log("Countries data not found in cache, fetching from server");
        countries = (
          await this.sdk.locations.countries.list({
            count: -1,
          })
        ).data;
        await applyOnChunkedArray(countries, 50, async (array) => {
          await this.cache.getAdapter().db.countries.bulkPut((array || []).map((v) => ({ ...v })));
        });
        console.log("Countries data loaded from server", countries?.length);
      }

      // states
      let states = !forceLoadFormServer ? await this.cache.getAdapter().db.states.toArray() : [];
      if (states?.length === 0) {
        console.log("States data not found in cache, fetching from server");
        states = (
          await this.sdk.locations.states.list({
            count: -1,
          })
        ).data;
        await applyOnChunkedArray(states, 50, async (array) => {
          await this.cache.getAdapter().db.states.bulkPut((array || []).map((v) => ({ ...v })));
        });
        console.log("States data loaded from server", states?.length);
      }

      // cities
      let cities = !forceLoadFormServer ? await this.cache.getAdapter().db.cities.toArray() : [];
      if (cities?.length === 0) {
        console.log("Cities data not found in cache, fetching from server");
        cities = (
          await this.sdk.locations.cities.list({
            count: -1,
          })
        ).data;
        await applyOnChunkedArray(cities, 50, async (array) => {
          await this.cache.getAdapter().db.cities.bulkPut((array || []).map((v) => ({ ...v })));
        });
        console.log("Cities data loaded from server", cities?.length);
      }

      console.log("Locations data loaded from cache");

      this._locationsData = {
        loaded: true,
        countries,
        states,
        cities,
        lastUpdated: new Date(),
      };
    } catch (error) {
      this.handleError(error);
    }
  }

  async getLocationsData(forceLoadFormServer = false) {
    await this.loadLocationsData(forceLoadFormServer);
    return this._locationsData;
  }
}
