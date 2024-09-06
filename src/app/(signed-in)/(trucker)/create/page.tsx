"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/client"; // Supabase Client
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast, { Toaster } from "react-hot-toast";
import PageHeader from "@/components/page-header";

const insertFail = () => toast.error("Oops something went wrong!");
const insertSuccess = () => toast.success("Listing has been created!");

// Initialize the Supabase client
const supabase = createClient();

// Define the Zod schema for form validation, where truckId is expected to be a number
const formSchema = z.object({
  from: z.string().min(1, "Pickup location is required"),
  to: z.string().min(1, "Delivery location is required"),
  dateLeaving: z
    .string()
    .min(1, "Date and time for leaving is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date and time",
    }),
  dateArriving: z
    .string()
    .min(1, "Date and time for arriving is required")
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date and time",
    }),
  price: z.number().min(1, "Rates must be greater than 0"),
  truckId: z.number().min(1, "Truck selection is required"), // truckId is now expected to be a number
});

// Define the form types using the Zod schema
type FormSchemaType = z.infer<typeof formSchema>;

export default function Component() {
  const [trucks, setTrucks] = useState<{ id: number; type: string }[]>([]); // Truck ID is a number
  const [truckType, setTruckType] = useState<number | undefined>(undefined); // Hold selected truck ID as a number

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const fetchTrucks = async () => {
    try {
      const { data, error } = await supabase.from("truckss").select("id, type");
      if (error) {
        toast.error("Error fetching trucks: " + error.message);
      } else {
        setTrucks(data || []);
      }
    } catch (error) {
      toast.error("Unexpected error fetching trucks.");
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const onSubmit = async (data: FormSchemaType) => {
    const generateRandomId = () => Math.floor(Math.random() * 1000000000);

    try {
      const formattedData = {
        id: generateRandomId(),
        from: data.from,
        to: data.to,
        dateLeaving: new Date(data.dateLeaving).toISOString(),
        dateArriving: new Date(data.dateArriving).toISOString(),
        expectedCost: data.price,
        truck: data.truckId, // truckId is sent as a number
      };

      const { error } = await supabase.from("listings").insert([formattedData]);

      if (error) {
        insertFail();
      } else {
        insertSuccess();
        reset(); // Reset the form after successful submission
      }
    } catch (error) {
      toast.error("Unexpected error during submission.");
    }
  };

  return (
    <>
      <PageHeader title="Create Listing" />
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Toaster />
        <Card>
          <CardContent>
            <form className="grid gap-6 mt-2" onSubmit={handleSubmit(onSubmit)}>
              {/* From - Pickup location */}
              <div className="grid gap-2 mt-4">
                <Label htmlFor="from">From</Label>
                <Input
                  id="from"
                  placeholder="Enter the pickup location"
                  {...register("from")}
                />
                {errors.from && (
                  <p className="text-red-500">{errors.from.message}</p>
                )}
              </div>

              {/* To - Delivery location */}
              <div className="grid gap-2">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  placeholder="Enter the delivery location"
                  {...register("to")}
                />
                {errors.to && (
                  <p className="text-red-500">{errors.to.message}</p>
                )}
              </div>

              {/* Date and Time for Leaving */}
              <div className="grid gap-2">
                <Label htmlFor="dateLeaving">Date Leaving</Label>
                <Input
                  id="dateLeaving"
                  type="datetime-local"
                  {...register("dateLeaving")}
                />
                {errors.dateLeaving && (
                  <p className="text-red-500">{errors.dateLeaving.message}</p>
                )}
              </div>

              {/* Date and Time for Arriving */}
              <div className="grid gap-2">
                <Label htmlFor="dateArriving">Date Arriving</Label>
                <Input
                  id="dateArriving"
                  type="datetime-local"
                  {...register("dateArriving")}
                />
                {errors.dateArriving && (
                  <p className="text-red-500">{errors.dateArriving.message}</p>
                )}
              </div>

              {/* Price (Rate) */}
              <div className="grid gap-2">
                <Label htmlFor="price">Rate</Label>
                <div className="flex items-center">
                  <span className="mr-2">R</span>
                  <Input
                    id="price"
                    type="number"
                    className="flex-1"
                    {...register("price", { valueAsNumber: true })}
                  />
                  <span className="ml-2">/km</span>
                </div>
                {errors.price && (
                  <p className="text-red-500">{errors.price.message}</p>
                )}
              </div>

              {/* Truck Selection using Radio Buttons */}
              <div className="grid gap-2">
                <Label htmlFor="truckId">Truck Type</Label>
                <Controller
                  name="truckId"
                  control={control}
                  render={({ field }) => (
                    <div>
                      {trucks.map((truck) => (
                        <label
                          key={truck.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            value={truck.id.toString()} // Radio inputs send values as strings, so convert to string here
                            checked={truckType === truck.id}
                            onChange={() => {
                              const truckIdNumber = Number(truck.id); // Convert the value back to a number
                              setTruckType(truckIdNumber); // Update state with truck ID as a number
                              field.onChange(truckIdNumber); // Pass the number to react-hook-form
                            }}
                          />
                          <span>{truck.type}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
                {errors.truckId && (
                  <p className="text-red-500">{errors.truckId.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className={`w-full sm:w-auto ${
                    isSubmitting ? "bg-gray-400 cursor-not-allowed" : ""
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "List Trucking Services"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
