import React from 'react';
import Link from 'next/link';

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
        <Link href="/listing" className="hover:text-gray-400">
          Loads
        </Link>
        <Link href="/create" className="hover:text-gray-400">
          Add Load
        </Link>

        {/* Authentication buttons */}
        {children}
      </div>
    </nav>
  );
};

export default NavBar;