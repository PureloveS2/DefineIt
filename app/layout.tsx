import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Defineit",
  description: "Dictiory application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased h-dvh w-screen`}
      >
        {children}
      </body>
    </html>
  );
}
