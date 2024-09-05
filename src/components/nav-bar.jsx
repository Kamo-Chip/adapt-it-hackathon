import React from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AlignJustify, Truck, Route, CirclePlus } from 'lucide-react';

const NavBar = ({ children }) => {
  return (
    <nav className="bg-black text-white py-2 px-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <img
          src="https://ttgbsdnzfrtznpmyzqga.supabase.co/storage/v1/object/public/resources/delivery.png"
          alt="Logo"
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
        {children}
      </div>
    </nav>
  );
};

export default NavBar;
