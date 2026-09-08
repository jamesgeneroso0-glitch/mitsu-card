import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Demo", // Lalabas bilang: Mitsu Smart Card | Demo
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}