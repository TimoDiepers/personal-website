import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Timo Diepers",
  description: "Overview of Timo Diepers' publications, presentations and coding projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
