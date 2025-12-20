"use client";

import { useDev } from "@hooks/use-dev";
import { 
  Database, 
  ChevronUp, 
  ChevronDown, 
  Info,
  Settings
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@lib/utils";
import { StoreManagerDevTool } from "./StoreManagerDevTool";

// Plugin Definition
export type DevToolPlugin = {
  id: string;
  name: string;
  icon: React.ElementType;
  component: React.ComponentType;
};

const InfoPlugin = () => (
  <div className="space-y-4 p-4">
    <div className="rounded bg-muted p-4 text-sm font-mono">
      <h3 className="font-bold mb-2">Environment Info</h3>
      <div className="grid grid-cols-2 gap-2">
        <span className="text-muted-foreground">Environment:</span>
        <span>{process.env.NODE_ENV}</span>
        <span className="text-muted-foreground">Screen Size:</span>
        <span>
          <span className="sm:hidden">xs</span>
          <span className="hidden sm:inline md:hidden">sm</span>
          <span className="hidden md:inline lg:hidden">md</span>
          <span className="hidden lg:inline xl:hidden">lg</span>
          <span className="hidden xl:inline">xl</span>
        </span>
      </div>
    </div>
  </div>
);

const PLUGINS: DevToolPlugin[] = [
  {
    id: "store-manager",
    name: "Store Manager",
    icon: Database,
    component: StoreManagerDevTool,
  },
  {
    id: "info",
    name: "System Info",
    icon: Info,
    component: InfoPlugin,
  },
];

export function DevTools() {
  const { isDev } = useDev();
  const [isOpen, setIsOpen] = useState(false);
  const [activePluginId, setActivePluginId] = useState(PLUGINS[0].id);
  const [isMounted, setIsMounted] = useState(false);

  // Persistence Logic
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const savedIsOpen = localStorage.getItem("devtools-open") === "true";
    const savedPluginId = localStorage.getItem("devtools-active-plugin");
    
    setIsOpen(savedIsOpen);
    if (savedPluginId && PLUGINS.some(p => p.id === savedPluginId)) {
      setActivePluginId(savedPluginId);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("devtools-open", String(isOpen));
  }, [isOpen, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    localStorage.setItem("devtools-active-plugin", activePluginId);
  }, [activePluginId, isMounted]);

  if (!isDev || !isMounted) return null;

  const ActiveComponent = PLUGINS.find(p => p.id === activePluginId)?.component || PLUGINS[0].component;

  return (
    <div 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-background border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out font-sans",
        isOpen ? "h-[50vh] max-h-[600px] min-h-[300px]" : "h-9"
      )}
    >
      {/* Header / Toolbar */}
      <div 
        className="flex h-9 shrink-0 items-center justify-between px-4 border-b bg-muted/80 hover:bg-muted cursor-pointer select-none backdrop-blur-sm" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
           <div className="flex items-center gap-2">
             <Settings className="h-3.5 w-3.5" />
             <span className="font-bold text-xs uppercase tracking-wider">DevTools</span>
           </div>
           
           {/* Quick Status Indicators (Visible when collapsed) */}
           {!isOpen && (
             <div className="flex items-center gap-3 text-xs text-muted-foreground border-l pl-3 ml-1">
               <span className="flex items-center gap-1.5">
                 <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                 {process.env.NODE_ENV}
               </span>
             </div>
           )}
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
           <span className="text-[10px] uppercase tracking-widest opacity-50">
             {isOpen ? "Collapse" : "Expand"}
           </span>
           {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </div>
      </div>

      {/* Content Area */}
      {isOpen && (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar / Tabs */}
          <div className="w-48 shrink-0 border-r bg-muted/30 flex flex-col overflow-y-auto">
            {PLUGINS.map(plugin => (
              <button
                key={plugin.id}
                onClick={() => setActivePluginId(plugin.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-3 text-xs font-medium transition-colors text-left border-l-2",
                  activePluginId === plugin.id 
                    ? "bg-background border-primary text-foreground" 
                    : "border-transparent hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                )}
              >
                <plugin.icon className="h-3.5 w-3.5" />
                {plugin.name}
              </button>
            ))}
          </div>
          
          {/* Main Panel */}
          <div className="flex-1 overflow-y-auto bg-background/50 p-0">
             <div className="h-full w-full">
               <ActiveComponent />
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
