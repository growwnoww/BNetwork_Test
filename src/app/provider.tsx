"use client";
import { ThemeProvider } from "@/providers/theme-provider";
import React, { Suspense, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { ThirdwebProvider } from "thirdweb/react";
import { RecoilRoot } from "recoil";
import toast, { Toaster } from "react-hot-toast";
import { usePathname,  } from "next/navigation";
import path from "path";
import { Navbar } from "@/components/(home-page)/Navbar";



export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();




  return (
   <Suspense>
      <RecoilRoot>
      <SessionProvider>
        <ThirdwebProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {pathname.startsWith("/dashboard") ? "" : <Navbar />}
            {children}
          </ThemeProvider>
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
   </Suspense>
  );
}
