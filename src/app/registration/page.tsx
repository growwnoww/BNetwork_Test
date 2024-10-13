import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GradientText1 from "@/components/texts/GradientText1";
import VerifySponsor from "@/components/forms/VerifySponsor";
import { Suspense } from "react";

export default function RegistrationPage() {
  return (
    <Suspense>
      <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
        <div className="hidden bg-muted lg:block">
          <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[380px]  gap-6">
            <div className="grid gap-2 text-center">
              <GradientText1
                text="Join the Believe Network"
                mobileSize="xl"
                desktopSize="5xl"
              />
              <p className="text-balance text-muted-foreground/80">
                Start Your Journey on Our BNB Blockchain-Powered Crowdfunding
                Platform.
              </p>
            </div>
            <VerifySponsor />
            <div className="mt-4 text-center text-sm">
              Don&apos;t have sponser?{" "}
              <Link href="#" className="underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
