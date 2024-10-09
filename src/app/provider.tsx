"use client";
import { ThemeProvider } from "@/providers/theme-provider";
import React, { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { ThirdwebProvider } from "thirdweb/react";
import { RecoilRoot } from "recoil";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/(home-page)/Navbar";
import WalletConnectionProvider from "@/providers/custom-wallet-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <RecoilRoot>
      <SessionProvider>
        <ThirdwebProvider>
          <WalletConnectionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {pathname.startsWith("/dashboard") ? "" : <Navbar />}
              {children}
            </ThemeProvider>
          </WalletConnectionProvider>

          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 5000,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
              },
            }}
          />
        </ThirdwebProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}
