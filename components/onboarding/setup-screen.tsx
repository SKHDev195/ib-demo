import { PresetPreview } from "@/components/onboarding/preset-preview";
import { ProfileForm } from "@/components/onboarding/profile-form";
import { PageHeader } from "@/components/ui/page-header";

/**
 * Screen 01 — preset selection. Shown at /dashboard until the dashboard has been
 * configured; afterwards only reachable through "Suggested preset" on Screen 03.
 */
export function SetupScreen() {
  return (
    <>
      <PageHeader
        title="Welcome to IB Academy, Amir"
        description="Step 1 of 2. Tell us how you work. We use your answers to build your dashboard, strategy and course list."
      />
      <div className="flex items-stretch gap-5">
        <div className="min-w-0 flex-1">
          <ProfileForm />
        </div>
        <PresetPreview />
      </div>
    </>
  );
}
