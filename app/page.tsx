import { redirect } from "next/navigation";

/** The app opens on the dashboard, which shows Screen 01 (setup) on first visit. */
export default function Home() {
  redirect("/dashboard");
}
