import { env } from "@config/env";
import { useAuth } from "./use-auth";
import { useMemo } from "react";

export const useDev = () => {
  const { user } = useAuth();

  const isDev = useMemo(() => {
    const isDevEnv = env.NODE_ENV === "development";
    const isMasterUser = user?.email === env.NEXT_PUBLIC_MASTER_EMAIL;
    
    return isDevEnv || isMasterUser;
  }, [user]);

  return {
    isDev,
  };
};
