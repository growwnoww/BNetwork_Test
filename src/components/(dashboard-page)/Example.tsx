'use client'
import React from "react";
import { useRecoilValue } from "recoil";
import {
  activeAccountState,
  walletConnectedState,
} from "@/store/recoil-store/walletState";
import { useActiveAccount, useActiveWalletConnectionStatus } from "thirdweb/react";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

const ExampleComponent = async () => {
  const activeAccountAddress = useRecoilValue(activeAccountState);
  const walletConnected = useRecoilValue(walletConnectedState);
  const status = useActiveWalletConnectionStatus();
  console.log(status);

  const activeAccount  = useActiveAccount()

  return (
    <div>
      <p>Wallet Connected: {walletConnected ? "Yes" : "No"}</p>
      <p>Active Account Address: {activeAccount?.address}</p>
      <p>Status is: {status}</p>

      {/* <p>session : {data}</p> */}
    </div>
  );
};

export default ExampleComponent;
