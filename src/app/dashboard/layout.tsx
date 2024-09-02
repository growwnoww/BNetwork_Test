
import Sidebar from "@/components/(dashboard-page)/Sidebar";
import React from "react";
import Dashboardwarpper from "./dashboardwarpper";
import { ThirdwebProvider } from "thirdweb/react";

type Props = {};

const DashboardRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div >
      <Dashboardwarpper>
      {children}
     </Dashboardwarpper>
      
    </div>
  );
};

export default DashboardRootLayout;
