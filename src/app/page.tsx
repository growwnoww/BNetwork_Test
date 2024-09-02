import { Hero } from "@/components/(home-page)/Hero";
import { Suspense } from "react";






export default function Home() {



  return (
   <Suspense>
     <main className="flex min-h-screen flex-col items-center justify-between p-24 relative  bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800">
      {/* <div className="h-32 w-full absolute top-1 z-20">
        <div className="h-16 w-full bg-yellow-500 dark:bg-orange-500 blur-3xl opacity-50 dark:opacity-40 rounded-bl-3xl rounded-br-3xl"></div>
      </div> */}

       <Hero/>
      

     </main>
   </Suspense>
  );
}
