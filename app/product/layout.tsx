import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product", // Lalabas bilang: Mitsu Smart Card | Product
};

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}