import type { ReactNode } from "react";
import { PlanProvider } from "./plan-context";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

/** Top bar + sidebar + scrolling content column shared by every Academy screen. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <PlanProvider>
      <div className="min-h-screen min-w-[1280px]">
        <TopBar />
        <div className="flex">
          <Sidebar />
          <main className="min-w-0 flex-1 space-y-6 px-8 pb-10 pt-7">{children}</main>
        </div>
      </div>
    </PlanProvider>
  );
}
