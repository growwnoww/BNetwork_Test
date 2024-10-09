import { useAutoConnect } from "thirdweb/react";
import { useRecoilState } from "recoil";
import { walletConnectedState, activeAccountState, activeWalletState } from "@/store/recoil-store/walletState";
import { client } from "@/lib/client";
import React, { useEffect } from "react";
import { createWallet } from "thirdweb/wallets";

// Define wallets data
const walletsData = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("pro.tokenpocket"),
];

const WalletConnectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletConnected, setWalletConnected] = useRecoilState(walletConnectedState);
  const [activeAccountAddress, setActiveAccountAddress] = useRecoilState(activeAccountState);
  const [activeWallet, setActiveWallet] = useRecoilState(activeWalletState);

  // Use the walletsData array directly in the wallets prop
  const { data: autoConnectedWallet, isLoading } = useAutoConnect({
    client,
    wallets: walletsData, // Corrected: using walletsData directly without wrapping in an extra array
    timeout: 2000,
    onConnect: (wallet) => {
      setWalletConnected(true);
      setActiveWallet(wallet);

      console.log("Auto connected to wallet:", wallet);
    },
  });

  useEffect(() => {
    if (autoConnectedWallet && !isLoading) {
      setWalletConnected(true);
      console.log("Auto connected wallet:", autoConnectedWallet);
    }
  }, [autoConnectedWallet, isLoading]);

  return <>{children}</>;
};

export default WalletConnectionProvider;
