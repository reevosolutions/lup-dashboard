import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import DexieAdapter from "@lib/managers/cache-manager/adapters/dexie-adapter";
import { setCredentials, clearCredentials } from "@store/features/auth/auth-slice";
import type { RootState } from "@store/index";

const persistenceMiddleware = createListenerMiddleware();

// List of actions that should trigger a save
const authActions = [setCredentials, clearCredentials];

persistenceMiddleware.startListening({
  matcher: isAnyOf(...authActions),
  effect: async (_, listenerApi) => {
    const state = listenerApi.getState() as RootState;
    const adapter = DexieAdapter.getInstance();

    try {
      // Persist Auth Slice
      if (state.auth.isAuthenticated && state.auth.user) {
          await adapter.setItem("auth_session", {
              user: state.auth.user,
              token: state.auth.token,
              roleGroup: state.auth.roleGroup
          });
          console.log("[Persistence] Auth state synced to Dexie");
      } else {
          // If not authenticated, ensure we clear the session from DB
          await adapter.removeItem("auth_session");
          console.log("[Persistence] Auth session removed from Dexie");
      }
    } catch (error) {
      console.error("[Persistence] Failed to sync auth state:", error);
    }
  },
});

export default persistenceMiddleware;
