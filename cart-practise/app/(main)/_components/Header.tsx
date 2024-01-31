"use client";
import Image from "next/image";
import { navBarLink } from "@/constants/index";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "../../../components/ui/sheet";
import { useShoppingContext } from "@/contexts/ShoppingContext";
import CartItem from "./CartItem";
import { formatCurrency } from "@/helpers/common";

const Header = () => {
  const { cartQty, totalPrice } = useShoppingContext();
  return (
    <div className="flex justify-between items-center ">
      <div className="hidden md:flex items-center gap-2 ">
        <Image src="/images/logo_title.png" width={50} height={50} alt="logo" />
        <h3>Vinh Shop</h3>
      </div>

      <div className="flex space-x-4">
        {navBarLink.map(({ route, label }) => (
          <div key={label}>
            <h3>{label}</h3>
          </div>
        ))}
      </div>
      <Sheet>
        <SheetTrigger>
          <div className="relative">
            <ShoppingCart />
            <p className="absolute -right-[0.5rem] top-[0.75rem] bg-red-400 rounded-full w-5 h-5 flex justify-center items-center">
              {cartQty}
            </p>
          </div>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader className="mb-10 text-lg font-semibold">
            Your Cart{" "}
          </SheetHeader>
          <SheetDescription>
            <CartItem />
          </SheetDescription>
          {totalPrice > 0 && (
            <SheetFooter>Total: {formatCurrency(totalPrice)}</SheetFooter>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
