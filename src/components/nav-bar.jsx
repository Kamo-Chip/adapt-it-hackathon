"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignInButton, useAuth } from "@clerk/nextjs";
import clsx from "clsx";
import { AlignJustify, CirclePlus, Route, Truck } from "lucide-react";
import Link from "next/link";

const NavBar = () => {
  const { isSignedIn } = useAuth();
  return (
    <nav
      className={clsx(
        "bg-black text-white py-2 px-4 flex justify-between items-center",
        { "hidden ": isSignedIn }
      )}
    >
      <div className="flex items-center space-x-4">
        <Image
          src="https://ttgbsdnzfrtznpmyzqga.supabase.co/storage/v1/object/public/resources/delivery.png"
          alt="Logo"
          width={64} // Set the width here
          height={64} // Set the height here
          className="h-6 w-8"
        />
        <div className="text-lg font-semibold">Adapt Trucking</div>
      </div>

      <div className="flex gap-4">
        {/* Navigation links */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <AlignJustify />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Truck />
              <Link href="/listings" className="hover:text-gray-400 ml-2">
                Loads
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <CirclePlus />
              <Link href="/create" className="hover:text-gray-400 ml-2">
                Add Load
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Route />
              <Link href="/mylistings" className="hover:text-gray-400 ml-2">
                My Loads
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Authentication buttons */}
        <SignInButton />
      </div>
    </nav>
  );
};

export default NavBar;
