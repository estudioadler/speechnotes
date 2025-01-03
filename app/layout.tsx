import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

import { Manrope } from 'next/font/google'

const manrope = Manrope({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full" suppressHydrationWarning>
      <body
        className={`${manrope.className} antialiased flex flex-col min-h-screen bg-no-repeat bg-gradient-to-tl from-background via-background to-primary-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
        >
          <Providers>
            <Toaster theme="system" />
            <main className="flex-grow">
              {children}
            </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

