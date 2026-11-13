import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import Nav from "./components/nav";
import Footer from "./components/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.hendo.buzz"),
  title: "Henderson Dike",
  description: "Henderson Dike — building simple, useful, thoughtfully engineered tools.",
  openGraph: {
    title: "Henderson Dike",
    description: "Henderson Dike's Portfolio",
    url: "https://www.hendo.buzz",
    siteName: "hendo.buzz",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henderson Dike",
    description: "Henderson Dike's Portfolio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/fonts/Geist.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <Script
        async
        src="https://cdn.seline.com/seline.js"
        data-token="07d32b34cee4012"
        strategy="afterInteractive"
      />
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="wrap">
            <Nav />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
