"use client";

import React, { useEffect, useState, useCallback } from "react";
import DexieAdapter from "@lib/managers/cache-manager/adapters/dexie-adapter";
import { useAppSelector } from "@store/hooks";
import { selectIsAuthenticated } from "@store/features/auth/auth-slice";

interface CacheStats {
  count: number;
  keys: any[];
}

export const StoreManagerDevTool: React.FC = () => {
  const [stats, setStats] = useState<CacheStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastSync, setLastSync] = useState<string>("-");
  
  // Redux State Monitoring
  const isAuth = useAppSelector(selectIsAuthenticated);
  const adapter = DexieAdapter.getInstance();

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adapter.getStats();
      setStats(data);
      setLastSync(new Date().toLocaleTimeString());
    } catch (e) {
      console.error("Failed to fetch DB stats", e);
    } finally {
      setLoading(false);
    }
  }, [adapter]);

  const handleClearCache = async () => {
    if (!confirm("Are you sure? This will wipe all local data.")) return;
    await adapter.clear();
    await fetchStats();
    window.location.reload(); // Force reload to reset Redux state if needed
  };

  useEffect(() => {
    fetchStats();
    // Poll every 5 seconds for dev visibility
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, [isAuth, fetchStats]); // Refresh when auth state changes

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2 dark:border-gray-700">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">
          Store Manager
        </h3>
        <span className="text-xs text-gray-500">Dexie / IndexedDB</span>
      </div>

      <div className="space-y-3">
        {/* Status Indicators */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-700">
            <span className="block text-gray-500 dark:text-gray-400">Redux Auth</span>
            <span className={`font-mono font-bold ${isAuth ? "text-green-500" : "text-red-500"}`}>
              {isAuth ? "AUTHENTICATED" : "GUEST"}
            </span>
          </div>
          <div className="rounded bg-gray-50 p-2 dark:bg-gray-700">
            <span className="block text-gray-500 dark:text-gray-400">DB Items</span>
            <span className="font-mono font-bold text-blue-500">
              {stats?.count ?? 0}
            </span>
          </div>
        </div>

        {/* Keys List */}
        <div className="max-h-24 overflow-y-auto rounded border border-gray-100 bg-gray-50 p-2 text-xs font-mono dark:border-gray-700 dark:bg-gray-900">
          {stats?.keys.length === 0 ? (
            <span className="text-gray-400">Empty Store</span>
          ) : (
            <ul className="space-y-1">
              {stats?.keys.map((k) => (
                <li key={String(k)} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                  {String(k)}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex-1 rounded bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-100 disabled:opacity-50 dark:bg-blue-900/30 dark:text-blue-400"
          >
            Refresh
          </button>
          <button
            onClick={handleClearCache}
            className="flex-1 rounded bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400"
          >
            Wipe DB
          </button>
        </div>
        
        <div className="text-center text-[10px] text-gray-400 mt-2">
            Last sync: {lastSync}
        </div>
      </div>
    </div>
  );
};
