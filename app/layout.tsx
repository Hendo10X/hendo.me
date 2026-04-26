import type { Metadata } from "next";

import { DM_Sans, Karla } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/sidebar";
import { ThemeProvider } from "next-themes";
import Script from "next/script";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Henderson Dike",
  description: "Henderson Dike's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          src="https://cdn.visitors.now/v.js"
          data-token="21aeda09-1a3f-46ed-a019-a2c74fe9fa8d"
          data-persist
        ></script>
      </head>
      <Script
        async
        src="https://cdn.seline.com/seline.js"
        data-token="07d32b34cee4012"
        strategy="afterInteractive"
      />
      <body className={`${dmSans.variable} ${karla.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="md:h-screen md:overflow-hidden">
            <div className="flex flex-col md:flex-row md:h-full max-w-4xl mx-auto px-6 md:px-0">
              <Sidebar />
              <main className="flex-1 pt-6 pb-16 md:pt-16 md:px-16 md:h-full md:overflow-y-auto scrollbar-hide">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
