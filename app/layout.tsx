import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Poppins is self-hosted (SIL OFL, see app/fonts/OFL.txt) so builds work offline.
const poppins = localFont({
  src: [
    { path: "./fonts/poppins-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/poppins-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/poppins-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/poppins-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  // Pages set their own name, shown as e.g. "Courses · Academy Demo".
  title: { default: "Academy Demo", template: "%s · Academy Demo" },
  description: "Dashboard, strategy and courses for CXM introducing brokers.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
