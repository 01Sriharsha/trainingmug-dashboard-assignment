import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import ReduxProvider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TrainingMug Dashboard",
  description: "A dashboard assignment givern by TrainingMug",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
