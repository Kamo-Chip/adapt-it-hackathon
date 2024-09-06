"use client";

import { createClient } from "@/utils/client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const getUserRole = async () => {
    try {
      const { data, error } = await supabase
        .from("roles")
        .select("role")
        .eq("user", userId);

      console.log(error);
      if (!data) throw new Error("Failed to fetch user role");

      console.log(data);
      if (data.length) {
        localStorage.setItem("role", data[0].role);
      } else {
        localStorage.setItem("role", "business");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      getUserRole();

      router.push(
        localStorage.getItem("role") === "transporter"
          ? "/my-listings"
          : "/listings"
      );
    }
  }, [isSignedIn]);
  return <main>Landing</main>;
}
