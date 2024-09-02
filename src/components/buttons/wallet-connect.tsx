"use client";
import React, { useEffect, useState, useTransition } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  ConnectButton,
  darkTheme,
  useActiveAccount,
  useActiveWallet,
  useConnectModal,
  useDisconnect,
} from "thirdweb/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeAccountState,
  walletConnectedState,
  activeWalletState,
  sessionDataState,
} from "@/global/recoil-store/walletState"; // Import your atoms
import { client } from "@/lib/client";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import { defineChain } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { signin, signout } from "@/actions/signin";


const MainnetChain = defineChain({
  id: 56, // BNB Mainnet chain ID
  rpc: "https://bsc-dataseed.binance.org/", // RPC URL for BNB Mainnet
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
});

export const TestnetChain = defineChain({
  id: 97, // BNB Testnet chain ID
  rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/", // RPC URL for BNB Testnet
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("pro.tokenpocket"),
];

interface ValueTypes{
  publicAddress:string;
  signedNonce:string;
}

const WalletConnect = () => {
  const activeAccount = useActiveAccount();
  const wallet = useActiveWallet();
  const { connect, isConnecting } = useConnectModal();
  const { disconnect } = useDisconnect();
  const { data } = useSession();
  const router = useRouter();
  const [isPending,startTransition] = useTransition()

  const [activeAccountAddress, setActiveAccountAddress] =
    useRecoilState(activeAccountState);
  const [walletConnected, setWalletConnected] =
    useRecoilState(walletConnectedState);
  const setActiveWallet = useSetRecoilState(activeWalletState);
  const setSessionData = useSetRecoilState(sessionDataState);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  
  async function onSignInWithCrypto() {
    try {
      const publicAddress = activeAccount?.address;
      console.log("Public address:", publicAddress);
  
      if (!publicAddress) {
        throw new Error(
          "Active account is not available or does not have an address."
        );
      }
  
      // Update Recoil state with the active account address
      setActiveAccountAddress(publicAddress);
      setWalletConnected(true);
      setActiveWallet(wallet);
  
      await new Promise((resolve) => setTimeout(resolve, 100));
  
      const response = await fetch("/api/auth/crypto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicAddress }),
      });
      
     
      const responseData = await response.json();
      console.log("res data is ",responseData)
  
 
  

     
  
      const signedNonce = await activeAccount?.signMessage({
        message: responseData.nonce,
      });
      console.log("Signed nonce:", signedNonce);
  
    


      // const ok = await signIn('crypto',{
      //   publicAddress,
      //   signedNonce,
      //   redirect:false
      // })

      // router.push('/dashboard')

      // console.log("ok ",ok)

      const values:ValueTypes={
        publicAddress,
        signedNonce
      }

      signin(values)


  
    } catch (error) {
      console.log("Error:", error);
    }
  }
  


  const signedTransactionCall = async () => {
    if (activeAccount?.address) {
      setActiveAccountAddress(activeAccount.address);
      if (!data?.user?.wallet_address) {
        await onSignInWithCrypto();
      }
    }
  };

  async function handleDisconnect() {
    if (wallet) {
      disconnect(wallet);
      const isSignout =   await signout()
      console.log("isSignout",isSignout)
      setActiveAccountAddress(null); // Reset Recoil state
      setWalletConnected(false);
      setActiveWallet(null);
      console.log("done");
    }
    console.log("wallet disconnected ", wallet);
  }

  useEffect(() => {
    // Simulate session loading
    const sessionTimeout = setTimeout(() => {
      setIsSessionLoading(false); // Set to false after session is loaded
    }, 1000); // Simulate session load delay

    return () => clearTimeout(sessionTimeout); // Cleanup timeout
  }, []);

  useEffect(() => {
    if (activeAccount?.address && !isSessionLoading) {
      console.log("wallet is ", activeAccount.address);
      console.log("wallet active", wallet);
      console.log("is reg", data?.user.isRegistered);
      setActiveAccountAddress(activeAccount.address);
      setWalletConnected(true);
      setActiveWallet(wallet);

      const timer = setTimeout(() => {
        if (!data?.user) {
          console.log("data", data);
          console.log("data . user ", data?.user);
          console.log("data user address ", data?.user?.wallet_address);
          console.log("hello");
          onSignInWithCrypto();
        }
      }, 1000); // 1000ms delay

      return () => clearTimeout(timer);
    }
  }, [activeAccount?.address, isSessionLoading]);

  return (
    <div>
      {walletConnected ? (
        <div className="flex items-center justify-center">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-2xl"
            onClick={handleDisconnect}
          >
            Disconnect
          </Button>
        </div>
      ) : (
        <div onClick={signedTransactionCall}>
          <ConnectButton
            chain={TestnetChain}
            client={client}
            wallets={wallets}
            theme={darkTheme({
              colors: { primaryButtonBg: "#f7cf02" },
            })}
            connectModal={{
              size: "compact",
              title: "Connect Wallet",
              showThirdwebBranding: false,
            }}
            connectButton={{
              label: "Connect Wallet",
              style: {
                width: "100px",
                height: "33px",
                borderRadius: "30px",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
