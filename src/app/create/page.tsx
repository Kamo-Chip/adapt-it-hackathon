"use client";

import { useEffect, useState } from "react";
import { createClient } from '@/utils/client'; // Supabase Client
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Initialize the Supabase client
const supabase = createClient();

// Define the Zod schema for form validation
const formSchema = z.object({
  from: z.string().min(1, "Pickup location is required"),
  to: z.string().min(1, "Delivery location is required"),
  dateLeaving: z.string().min(1, "Date and time for leaving is required").refine(
    (val) => !isNaN(Date.parse(val)), // Ensures it's a valid date-time format
    { message: "Invalid date and time" }
  ),
  dateArriving: z.string().min(1, "Date and time for arriving is required").refine(
    (val) => !isNaN(Date.parse(val)), // Ensures it's a valid date-time format
    { message: "Invalid date and time" }
  ),
  price: z.number().min(1, "Rates must be greater than 0"),
  truckId: z.string().min(1, "Truck selection is required"), // Updated field
});

// Define the form types using the Zod schema
type FormSchemaType = z.infer<typeof formSchema>;

export default function Component() {
  const [trucks, setTrucks] = useState<{ id: string; type: string }[]>([]);

  // Initialize react-hook-form with Zod validation
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  // Fetch trucks from Supabase
  const fetchTrucks = async () => {
    try {
      const { data, error } = await supabase.from("truckss").select("id, type");
      if (error) {
        console.error("Error fetching trucks:", error.message);
      } else {
        console.log("Data fetched successfully:", data);
        setTrucks(data || []);
      }
    } catch (error) {
      console.error("Unexpected error fetching trucks:", error);
    }
  };

  // Use useEffect to trigger the fetch on page load
  useEffect(() => {
    fetchTrucks();
  }, []);

  // Handle form submission
  const onSubmit = async (data: FormSchemaType) => {
    const generateRandomId = () => Math.floor(Math.random() * 1000000000); // Large range for uniqueness

    try {
      // Format data before inserting into the database
      const formattedData = {
        id: generateRandomId(), // Use the random integer ID
        from: data.from,
        to: data.to,
        dateLeaving: new Date(data.dateLeaving).toISOString(),
        dateArriving: new Date(data.dateArriving).toISOString(),
        expectedCost: data.price,
        truck: data.truckId, // Ensure truckId is included
      };

      const { error } = await supabase
        .from("listings")
        .insert([formattedData]); // Insert the formatted data

      if (error) {
        console.error("Error inserting data:", error);
      } else {
        console.log("Data successfully inserted!");
      }
    } catch (error) {
      console.error("Unexpected error during submission:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <Card>
        <CardContent>
          <form className="grid gap-6 mt-2" onSubmit={handleSubmit(onSubmit)}>
            {/* From - Pickup location */}
            <div className="grid gap-2 mt-4">
              <Label htmlFor="from">From</Label>
              <Input id="from" placeholder="Enter the pickup location" {...register("from")} />
              {errors.from && <p className="text-red-500">{errors.from.message}</p>}
            </div>

            {/* To - Delivery location */}
            <div className="grid gap-2">
              <Label htmlFor="to">To</Label>
              <Input id="to" placeholder="Enter the delivery location" {...register("to")} />
              {errors.to && <p className="text-red-500">{errors.to.message}</p>}
            </div>

            {/* Date and Time for Leaving */}
            <div className="grid gap-2">
              <Label htmlFor="dateLeaving">Date Leaving</Label>
              <Input id="dateLeaving" type="datetime-local" {...register("dateLeaving")} />
              {errors.dateLeaving && <p className="text-red-500">{errors.dateLeaving.message}</p>}
            </div>

            {/* Date and Time for Arriving */}
            <div className="grid gap-2">
              <Label htmlFor="dateArriving">Date Arriving</Label>
              <Input id="dateArriving" type="datetime-local" {...register("dateArriving")} />
              {errors.dateArriving && <p className="text-red-500">{errors.dateArriving.message}</p>}
            </div>

            {/* Price (Rate) */}
            <div className="grid gap-2">
              <Label htmlFor="price">Rate</Label>
              <div className="flex items-center">
                <span className="mr-2">R</span>
                <Input id="price" type="number" className="flex-1" {...register("price", { valueAsNumber: true })} />
                <span className="ml-2">/km</span>
              </div>
              {errors.price && <p className="text-red-500">{errors.price.message}</p>}
            </div>

            {/* Truck Selection */}
            <div className="grid gap-2">
              <Label htmlFor="truckId">Truck Type</Label>
              <div className="flex items-center">
                <Controller
                  name="truckId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(selectedValue) => field.onChange(selectedValue)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a truck type" value={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        {trucks.map((truck) => (
                          <SelectItem key={truck.id} value={truck.id}>
                            {truck.type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.truckId && <p className="text-red-500">{errors.truckId.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className={`w-full sm:w-auto ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "List Trucking Services"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}