"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";  // Import useRouter for navigation
import toast, { Toaster } from 'react-hot-toast';

const loginError = () => toast.error('Oops something went wrong!');

const supabase = createClient();

export default function Component() {
  const router = useRouter();  // Initialize router
  const { userId } = useAuth();  // Get userId from useAuth

  // Function to handle button clicks and redirection
  const handleTransporter = async (user: string | null | undefined, role: string, redirectPath: string): Promise<void> => {
    if (!user) {
      console.error('User is not logged in');
      return;
    }

    const { data, error } = await supabase
      .from('roles')
      .insert([{ user: user, role: role }])
      .select();

    if (error) {
      loginError();
      console.error('Error inserting data: ', error.message);
    } else {
      console.log('Data inserted: ', data);
      router.push(redirectPath);  // Redirect to the desired route after success
    }
  };

  return (
    <main className="w-full min-h-screen bg-background flex items-center justify-center p-4">
      <Toaster />
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Transporter Card */}
        <Card className="bg-primary text-primary-foreground p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Transporter</CardTitle>
            <CardDescription className="text-muted-foreground">
              As a Transporter, you are responsible for safely moving goods from one location to another. You'll have
              access to our fleet of vehicles and logistics tools to optimize your deliveries.
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-6">
            <Button
              onClick={() => handleTransporter(userId, "transporter", "/listings")}  // Redirect to transporter dashboard
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
              As a Consignee, you'll receive goods from our Transporters. You can track your shipments, manage your
              inventory, and communicate with Transporters through our platform.
            </CardDescription>
          </CardHeader>
          <CardFooter className="mt-6">
            <Button
              onClick={() => handleTransporter(userId, "business", "/listings")}  // Redirect to consignee dashboard
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