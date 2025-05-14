import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/Provider";
import { AuthInitializer } from "@/components/Functional/AuthInitializer";
import { Header } from "@/components/Functional/Header";
import StyledJsxRegistry from "@/styles/registry";
import SlideOver from "@/components/presentational/layout/SlideOver";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Games Day!",
  description: "Multiplayer games",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <AuthInitializer>
        <StyledJsxRegistry>
          <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
              <Header />
              <SlideOver position="left" tabContent=">">
                Content
              </SlideOver>
              <div className="main">{children}</div>
            </body>
          </html>
        </StyledJsxRegistry>
      </AuthInitializer>
    </StoreProvider>
  );
}
