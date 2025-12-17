"use client";

import { useDev } from "@hooks/use-dev";
import { Bug, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@lib/utils"; // Assuming utils exists, if not I'll check
import { StoreManagerDevTool } from "./StoreManagerDevTool";

export function DevTools() {
  const { isDev } = useDev();
  const [isOpen, setIsOpen] = useState(false);

  if (!isDev) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      {isOpen && (
        <div className="w-80 rounded-lg border bg-background p-4 shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Developer Tools</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="rounded bg-muted p-2 text-xs font-mono">
              <p>Environment: {process.env.NODE_ENV}</p>
              <p>Screen: <span className="hidden sm:inline">sm</span> <span className="hidden md:inline">md</span> <span className="hidden lg:inline">lg</span> <span className="hidden xl:inline">xl</span></p>
            </div>

            {/* Store Manager */}
            <StoreManagerDevTool />
            
            <div className="grid grid-cols-2 gap-2">
              {/* Placeholders for future tools */}
              <button className="rounded border p-2 text-xs hover:bg-muted text-left">
                Fill Form (Fake)
              </button>
              <button className="rounded border p-2 text-xs hover:bg-muted text-left">
                Toggle Theme
              </button>
              <button className="rounded border p-2 text-xs hover:bg-muted text-left">
                Log State
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-110 active:scale-95",
          isOpen ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
        )}
        title="Toggle Developer Tools"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Bug className="h-6 w-6" />}
      </button>
    </div>
  );
}
