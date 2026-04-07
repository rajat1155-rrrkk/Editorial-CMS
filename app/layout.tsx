import type { Metadata } from "next";
import { AppShellFrame } from "../components/app-shell-frame";
import "./globals.css";

export const metadata: Metadata = {
  title: "Editorial CMS Showcase",
  description:
    "A Vercel-ready MVP sample for a multilingual, multi-site editorial CMS platform."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppShellFrame>{children}</AppShellFrame>
      </body>
    </html>
  );
}
