import type { Metadata } from "next";
import "./reset.css";
import StoreProvider from "@/store/Provider";
import { AuthInitializer } from "@/components/Functional/AuthInitializer";
import { Header } from "@/components/Functional/Header";
import StyledJsxRegistry from "@/styles/registry";
import { SlideOver } from "@/components/Presentational/Layout/SlideOver";
import { DevPanel } from "@/components/Functional/DevPanel/DevPanel";
import { karla } from "@/styles/fonts";
import { GlobalStyles } from "@/app/globalStyles";

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
          <GlobalStyles />
          <html lang="en" className={karla.className}>
            <body>
              <Header />
              <SlideOver position="left">
                <DevPanel />
              </SlideOver>
              <div className="main">{children}</div>
            </body>
          </html>
        </StyledJsxRegistry>
      </AuthInitializer>
    </StoreProvider>
  );
}
