import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { WalletCards } from "lucide-react"

export function BNWalletSheet() {
  return (
    <Sheet >
      <SheetTrigger asChild >
      <WalletCards className="text-muted-foreground border bg-black  w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer p-1.5"/>

      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center">Wallet</SheetTitle>
          <SheetDescription className="text-center">
            BN Coin Wallet Comming soon.
          </SheetDescription>
        </SheetHeader>
       
        <SheetFooter>
          <SheetClose asChild>
            {/* <Button type="submit">Save changes</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
