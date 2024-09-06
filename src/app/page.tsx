"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/client";
import { useAuth } from "@clerk/nextjs";
import { DollarSign, Package, Star } from "lucide-react";
import Link from "next/link";
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

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Connect Consignees to Truckers
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Maximize efficiency by filling empty return trips. Save money,
                  reduce emissions, and increase profits for everyone.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Package className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Smart Matching</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Our algorithm matches consignees with truckers based on route,
                  capacity, and schedule.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <DollarSign className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Cost Savings</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Reduce empty miles and increase profits for both consignees
                  and truckers.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Star className="h-8 w-8 mb-2" />
                <h3 className="text-xl font-bold">Rating System</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Build trust with our comprehensive rating and review system
                  for all users.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">For Consignees</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Post your shipment details</li>
                  <li>Get matched with available truckers</li>
                  <li>Choose your preferred trucker</li>
                  <li>Track your shipment in real-time</li>
                </ol>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">For Truckers</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Input your route and available capacity</li>
                  <li>Receive matching shipment offers</li>
                  <li>Accept the most profitable loads</li>
                  <li>Maximize your earnings on return trips</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              What Our Users Say
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-2 border-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {"AdaptTrucking has revolutionized our logistics. We've cut costs and improved efficiency significantly."}
                </p>
                <p className="font-semibold">- John D., Consignee</p>
              </div>
              <div className="flex flex-col space-y-2 border-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {"I'm making money on trips that used to be empty. It's a game-changer for us truckers."}
                </p>
                <p className="font-semibold">- Sarah L., Trucker</p>
              </div>
              <div className="flex flex-col space-y-2 border-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {
                    "The platform is user-friendly and the support team is always helpful. Highly recommended!"
                  }
                </p>
                <p className="font-semibold">- Mike R., Logistics Manager</p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to optimize your logistics?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join AdaptTrucking today and start saving on transportation
                  costs while reducing empty miles.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 AdaptTrucking Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
