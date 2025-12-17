import { config } from "@config/index";
import { useAuth } from "./use-auth";
import { useMemo } from "react";

export const useDev = () => {
  const { user } = useAuth();

  const isDev = useMemo(() => {
    const isDevEnv = config.runtime.dev.isDev;
    const isMasterUser = user?.email === config.app.dev.master.email;
    
    return isDevEnv || isMasterUser;
  }, [user]);

  return {
    isDev,
  };
};
