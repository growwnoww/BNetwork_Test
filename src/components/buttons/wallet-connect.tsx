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
} from "@/store/recoil-store/walletState"; // Import your atoms
import { client } from "@/lib/client";
import { Button } from "../ui/button";
import { redirect, useRouter } from "next/navigation";
import { defineChain } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { getSessionStatus, signin, signout } from "@/actions/signin";
import { verifyRegisteredUser } from "@/actions/registartion";
import { auth } from "@/auth";

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
interface SuccessResponse {
  success: boolean;
}

interface ErrorResponse {
  error: any;
}
interface ValueTypes {
  publicAddress: string;
  signedNonce: string;
}

type SigninResponse = SuccessResponse | ErrorResponse;

function isSuccessResponse(
  response: SigninResponse
): response is SuccessResponse {
  return "success" in response && response.success;
}

const WalletConnect = () => {
  const activeAccount = useActiveAccount();
  const wallet = useActiveWallet();
  const { connect, isConnecting } = useConnectModal();
  const { disconnect } = useDisconnect();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [activeAccountAddress, setActiveAccountAddress] =
    useRecoilState(activeAccountState);
  const [walletConnected, setWalletConnected] =
    useRecoilState(walletConnectedState);
  const setActiveWallet = useSetRecoilState(activeWalletState);
  const setSessionData = useSetRecoilState(sessionDataState);
  const [isSessionLoading, setIsSessionLoading] = useState(true);
  const [user, setUser] = useState<boolean>(false);

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

      const signedNonce = await activeAccount?.signMessage({
        message:
          "Sign the message to confirmation, this action not causes any gas fee",
      });
      console.log("Signed nonce:", signedNonce);

      const isRegistered = await verifyRegisteredUser(publicAddress);
      console.log('isRegistered',isRegistered)

      
      if (isRegistered) {
        const response = await fetch("/api/auth/crypto", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({publicAddress }),
        });

        const responseData = await response.json();
        console.log("res data is ", responseData);

        const signedNonce = await activeAccount?.signMessage({
          message: responseData.nonce,
        });
        console.log("Signed nonce:", signedNonce);

        const values: ValueTypes = {
          publicAddress,
          signedNonce,
        };

        const res: SigninResponse = await signin(values);

        if (isSuccessResponse(res)) {
          router.push("/dashboard");
          return;
        }
      }


    } catch (error) {
      console.log("Error:", error);
    }
  }

  const signedTransactionCall = async () => {
    console.log("called")
    if (activeAccount?.address) {
      setActiveAccountAddress(activeAccount.address);
      console.log("user is ",user)
      if (!user) {
        await onSignInWithCrypto();
      }
    }
  };

  async function handleDisconnect() {
    if (wallet) {
      disconnect(wallet);
      const isSignout = await signout();
      console.log("isSignout", isSignout);
      setActiveAccountAddress(null); // Reset Recoil state
      setWalletConnected(false);
      setActiveWallet(null);
      setUser(false)
      console.log("done");
    }
    console.log("wallet disconnected ", wallet);
  }

  useEffect(() => {
    // Define an async function inside useEffect
    const checkSessionStatus = async () => {
      try {
        const status = await getSessionStatus();
        console.log("status is ",status)
        setUser(status);
      } catch (error) {
        console.error('Failed to get session status:', error);
        setUser(false);
      } finally {
        setIsSessionLoading(false);
      }
    };

    // Call the async function
    checkSessionStatus();
  }, []); // Dependency array can include dependencies if needed

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
      setActiveAccountAddress(activeAccount.address);
      setWalletConnected(true);
      setActiveWallet(wallet);
      console.log("user is ",user)

      const timer = setTimeout(() => {
        if (!user ) {
          console.log("user", user);

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
