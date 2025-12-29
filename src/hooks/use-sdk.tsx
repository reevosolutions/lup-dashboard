import LevelupSdk, { initSdk, LevelupClientAppApiCallHeaders } from "levelup-sdk";
import {config} from "@config/index";
import AuthenticationManager from "@lib/managers/authentication-manager";

export const useSdk = (id: string = "DEFAULT") => {
  return initSdkForLevelupClientApp(id);
};

export async function levelupApiCallHeadersInjector(): Promise<LevelupClientAppApiCallHeaders> {
  const authManager = AuthenticationManager.getInstance();
  const authData = await authManager.getAuthData();
  if (!authData) return {};

  const headers: { [key: string]: string } = {};

  const token = await authManager.loadAccessToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (authData.app && authData.app._id === authData.user?.app) {
    headers["X-App-Id"] = authData.app._id;
  }

  if (authData.company && authManager.isCompanyManagedByUser(authData.company._id, authData.user)) {
    headers["X-Company-Id"] = authData.company._id;
  }

  if (authData.office) {
    headers["X-Office-Id"] = authData.office._id;
  }

  if (authData.store && authManager.isStoreManagedByUser(authData.store._id, authData.user)) {
    headers["X-Store-Id"] = authData.store._id;
  }

  return headers;
}

export async function refreshTokenHandler(sdk: Levelup.V2.SDK.ISdk): Promise<void> {
  const authManager = AuthenticationManager.getInstance();
  const authData = await authManager.getAuthData();
  const refreshToken = await authManager.loadRefreshToken();
  if (!authData || !refreshToken) return;

  const response = await (sdk as LevelupSdk).auth.auth.refreshToken({
    data: { refresh_token: refreshToken },
  });

  if (!response.data.token) {
    await authManager.logout();
    return;
  }

  authManager.authenticate(response.data);
}

export function initSdkForLevelupClientApp(id: string = "DEFAULT") {
  return initSdk(
    "frontend",
    {
      ...config.sdk,
      headersInjector: levelupApiCallHeadersInjector,
      refreshTokenHandler: refreshTokenHandler,
    },
    id
  );
}
