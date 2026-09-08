import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User", // Lalabas bilang: Mitsu Smart Card | User
};

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}