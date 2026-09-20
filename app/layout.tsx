import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RedLine Ambulance Services",
  description: "Professional emergency ambulance and patient transportation services, available 24/7.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
