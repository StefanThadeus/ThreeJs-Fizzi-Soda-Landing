import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { COLORS } from "@/lib/colors";
import { Header } from "@/components/Header";
import { ViewCanvas } from "@/components/ViewCanvas";

const alpinoSans = localFont({
  src: [
    {
      path: "../../public/fonts/Alpino-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-alpino",
});

export const metadata: Metadata = {
  title: "Fizzi Soda",
  description: "Fizzi Soda Landing Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alpinoSans.variable} h-full antialiased`}>
      <body
        className="overflow-x-hidden"
        style={{ backgroundColor: COLORS.fizziYellow }}
      >
        <Header />
        <main>
          {children}
          <ViewCanvas />
        </main>
      </body>
    </html>
  );
}
