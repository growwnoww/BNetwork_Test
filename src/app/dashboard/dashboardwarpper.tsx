import { Dashboard } from "@/components/(dashboard-page)/(demo-components)/Dashboard-1";

import Sidebar from "@/components/(dashboard-page)/Sidebar";
import React from "react";

type Props = {};

const Dashboardwarpper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-screen  md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" >
      <Sidebar />

      <div className="">
      <Dashboard> {children}</Dashboard>

      </div>
       
    </div>
  );
};

export default Dashboardwarpper;
