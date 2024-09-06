"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/client";
import { useAuth } from "@clerk/nextjs";
import { Clerk } from "@clerk/clerk-js"; // Import Clerk from clerk-js
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import toast, { Toaster } from "react-hot-toast";

// Initialize Clerk object
const clerk = new Clerk(
  "pk_test_Z2VudGxlLXBlYWNvY2stMjIuY2xlcmsuYWNjb3VudHMuZGV2JA"
);

const loginError = () => toast.error("Oops something went wrong!");

const supabase = createClient();

export default function Component() {
  const router = useRouter(); // Initialize router
  const { userId } = useAuth(); // Get userId from useAuth
  const [clerkLoaded, setClerkLoaded] = useState(false); // Track Clerk load status
  const [email, setEmail] = useState("");
  // Load Clerk in useEffect
  useEffect(() => {
    const loadClerk = async () => {
      try {
        await clerk.load(); // Load Clerk asynchronously
        console.log("Clerk loaded successfully");
        setClerkLoaded(true); // Set state to reflect that Clerk has been loaded
        console.log(clerk.user?.emailAddresses);
        if (clerk.user?.emailAddresses) {
          const email = clerk.user.emailAddresses[0]?.emailAddress; // Extract the first email
          setEmail(email);
          console.log("Email Address:", email);
        }
      } catch (error) {
        console.error("Error loading Clerk:", error);
        loginError();
      }
    };

    loadClerk(); // Call the function to load Clerk when the component mounts
  }, []);

  // Function to handle button clicks and redirection
  const handleTransporter = async (
    user: string | null | undefined,
    role: string,
    redirectPath: string
  ): Promise<void> => {
    try {
      // Check if user is logged in
      if (!user) {
        console.error("User is not logged in");
        return;
      }

      const { data, error } = await supabase
        .from("roles")
        .insert([{ user: user, role: role, email: email }])
        .select();

      if (error) {
        console.error("Error inserting data: ", error.message);
        loginError();
        return;
      }

      console.log("Data inserted: ", data);

      // Save role in localStorage
      localStorage.setItem("role", role);

      // Ensure redirection happens after the insert completes
      router.push(redirectPath);
    } catch (err) {
      console.error("Unexpected error occurred: ", err);
      loginError();
    }
  };

  if (!clerkLoaded) {
    return <div>Loading...</div>; // Show a loading state until Clerk is loaded
  }

  return (
    <main className="w-full min-h-screen bg-background flex items-center justify-center p-4">
      <Toaster />
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Transporter Card */}
        <Card className="bg-primary text-primary-foreground p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Transporter</CardTitle>
            <CardDescription className="text-muted-foreground">
              {
                "As a Transporter, you are responsible for safely moving goods from one location to another. You'll have access to our fleet of vehicles and logistics tools to optimize your deliveries."
              }
              
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-6">
            <Button
              onClick={() =>
                handleTransporter(userId, "transporter", "/my-listings")
              } // Redirect to transporter dashboard
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary-foreground px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Become a Transporter
            </Button>
          </CardFooter>
        </Card>

        {/* Consignee Card */}
        <Card className="bg-secondary text-secondary-foreground p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Consignee</CardTitle>
            <CardDescription className="text-muted-foreground">
              {
                "As a Consignee, you'll receive goods from our Transporters. You can track your shipments, manage your inventory, and communicate with Transporters through our platform."
              }
              
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-6">
            <Button
              onClick={() => handleTransporter(userId, "business", "/listings")} // Redirect to consignee dashboard
              className="inline-flex h-10 items-center justify-center rounded-md bg-secondary-foreground px-8 text-sm font-medium text-secondary shadow transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Become a Consignee
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
