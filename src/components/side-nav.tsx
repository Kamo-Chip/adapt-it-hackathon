"use client";
import { createClient } from "@/utils/client";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavLinks from "./nav-links";

function SideNav() {
  const supabase = createClient();
  const { userId } = useAuth();
  const [role, setRole] = useState<string>();
  const router = useRouter();
  const pathname = usePathname();
  const getUserRole = async () => {
    try {
      const { data } = await supabase
        .from("roles")
        .select("role")
        .eq("user", userId);

      if (!data || !data.length) throw new Error("Failed to fetch user role");

      localStorage.setItem("role", data[0].role);
      setRole(data[0].role);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserRole();
  }, []);

  useEffect(() => {
    console.log(role);

    if (role === "transporter") {
      if (pathname === "/listings") {
        router.push("my-listings");
      }
    } else {
      if (pathname === "/my-listings") {
        router.push("listings");
      }
    }
  }, [role]);

  return (
    <nav className="h-full flex flex-col">
      <div className="bg-black flex flex-col h-full text-white p-2 pt-6 items-center">
        <img
          src="https://ttgbsdnzfrtznpmyzqga.supabase.co/storage/v1/object/public/resources/delivery.png"
          alt="Logo"
          className="h-16 w-16 p-2 bg-white rounded-full object-cover object-center"
        />

        <span className="text-white mb-14 capitalize mt-2 font-medium">
          {role && `For ${role}s`}
        </span>
        <NavLinks role={role} />
      </div>
    </nav>
  );
}

export default SideNav;
