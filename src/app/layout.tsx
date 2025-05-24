import type { Metadata } from "next";
import StoreProvider from "@/store/Provider";
import { AuthInitializer } from "@/components/Functional/AuthInitializer";
import { Header } from "@/components/Functional/Header";
import StyledJsxRegistry from "@/styles/registry";
import { SlideOver } from "@/components/Presentational/Layout/SlideOver";
import { DevPanel } from "@/components/Functional/DevPanel/DevPanel";
import { Html } from "@/app/globalStyles";
import { cormorant, karla } from "@/styles/fonts";

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
          <Html lang="en">
            <body className={`${cormorant.className} ${karla.className}`}>
              <Header />
              <SlideOver position="left">
                <DevPanel />
              </SlideOver>
              <div className="main">{children}</div>
            </body>
          </Html>
        </StyledJsxRegistry>
      </AuthInitializer>
    </StoreProvider>
  );
}
