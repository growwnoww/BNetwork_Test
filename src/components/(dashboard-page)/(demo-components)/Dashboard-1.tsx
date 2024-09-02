"use client";
import Link from "next/link";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  WalletCards,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BNWalletSheet } from "@/components/sheet/bnwallet-sheet";
import { signOut, useSession } from "next-auth/react";
import {
  useActiveAccount,
  useActiveWallet,
  useDisconnect,
} from "thirdweb/react";
import { useRecoilState } from "recoil";
import {
  activeAccountState,
  walletConnectedState,
} from "@/global/recoil-store/walletState";

export function Dashboard({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const activeAccount = useActiveAccount();
  const { disconnect } = useDisconnect();
  const wallet = useActiveWallet();
  const [activeAccountAddress, setActiveAccountAddress] =
    useRecoilState(activeAccountState);
  const [walletConnected, setWalletConnected] =
    useRecoilState(walletConnectedState);


    

  const handleDisconnect = async () => {
    if (wallet) {
      disconnect(wallet);

      signOut();
      setActiveAccountAddress(null); // Reset Recoil state
      setWalletConnected(false);
      console.log("done");
    }
    console.log("wallet ", wallet);
    console.log("helo");
    console.log("active account address", activeAccountAddress);
    console.log("is in wallet address persist ", activeAccount?.address);
  };
  return (
    <div className="flex flex-col ">
      <header className="fixed w-full  flex h-14 items-center gap-4 border-b bg-muted/40 backdrop-blur-xl px-4 lg:h-[60px] lg:px-6 ">
        <div className="w-full flex flex-1 items-center justify-end ">
          <div className="hidden lg:block mr-80">
            <div className="flex">
              <p>{session.data?.user.wallet_address}</p>
              <Button variant="secondary" size="lg" onClick={handleDisconnect}>
                Disconnect
              </Button>
              <BNWalletSheet />
            </div>
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <Users className="h-5 w-5" />
                Customers
              </Link>
              <Link
                href="#"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <LineChart className="h-5 w-5" />
                Analytics
              </Link>
            </nav>
            <div className="mt-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Upgrade to Pro</CardTitle>
                  <CardDescription>
                    Unlock all features and get unlimited access to our support
                    team.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">
                    Upgrade
                  </Button>
                </CardContent>
              </Card>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <div className="mt-16">{children}</div>
    </div>
  );
}
