"use server";

import { createClient } from "@/utils/server";
import { auth } from "@clerk/nextjs/server";

export type CreateBiddingActionState = {
  message: string;
  type?: "success" | "error";
};

export async function createBidding(
  prevState: CreateBiddingActionState,
  formData: FormData
): Promise<CreateBiddingActionState> {
  const supabase = createClient();
  const { userId } = auth();
  const fields = Object.fromEntries(formData.entries());

  try {
    if (!userId || !fields.bidPrice || !fields.listingId)
      throw new Error("Missing fields");
    const { error } = await supabase
      .from("bids")
      .insert([
        {
          price: Number(fields.bidPrice),
          consigneeId: userId,
          listingId: fields.listingId,
        },
      ])
      .select();
    if (error) throw new Error(`Supabase error: ${error}`);
    return {
      message: "Successfully placed bid",
      type: "success",
    };
  } catch (error) {
    console.log("Failed to add bidding: ", error);
    return {
      message: "Failed to add bidding",
      type: "error",
    };
  }
}
