import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { metadataBase: new URL("https://navgrove.com"), title: "NavGrove | Discover tools worth using", description: "Discover curated AI products, online tools, developer resources and useful websites." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html><body>{children}</body></html>; }
