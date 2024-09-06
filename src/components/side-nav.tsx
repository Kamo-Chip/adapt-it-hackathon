"use client";
import NavLinks from "./nav-links";

function SideNav() {
  return (
    <nav className="h-full flex flex-col">
      <div className="bg-black flex flex-col h-full text-white p-2 pt-6 items-center">
        <img
          src="https://ttgbsdnzfrtznpmyzqga.supabase.co/storage/v1/object/public/resources/delivery.png"
          alt="Logo"
          className="h-16 w-16 p-2 bg-white rounded-full object-cover object-center"
        />
        <span className="text-white mb-14 capitalize mt-2 font-medium">
          For {localStorage.getItem("role")}s
        </span>
        <NavLinks />
      </div>
    </nav>
  );
}

export default SideNav;
