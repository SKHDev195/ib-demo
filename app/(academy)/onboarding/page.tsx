import { SetupScreen } from "@/components/onboarding/setup-screen";

export const metadata = { title: "Welcome" };

/** Screen 01 on its own route: the "Suggested preset" tab on Screen 03 links here. */
export default function OnboardingPage() {
  return <SetupScreen />;
}
