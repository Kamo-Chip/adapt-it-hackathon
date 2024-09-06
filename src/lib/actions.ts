"use server";

import { createClient } from "@/utils/server";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

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

export async function deleteListing(
  prevState: CreateBiddingActionState,
  formData: FormData
): Promise<CreateBiddingActionState> {
  const supabase = createClient();
  const { userId, use } = auth();
  const fields = Object.fromEntries(formData.entries());

  console.log(userId);
  console.log(fields.listingId);
  try {
    if (!fields.listingId) throw new Error("Missing fields");
    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("id", fields.listingId);
    if (error) throw new Error(`Supabase error: ${error}`);
    revalidatePath("/my-listings");
    return {
      message: "Successfully removed listing",
      type: "success",
    };
  } catch (error) {
    console.log("Failed to remove listing: ", error);
    return {
      message: "Failed to remove listing",
      type: "error",
    };
  }
}

export async function handleBid(
  prevState: CreateBiddingActionState,
  formData: FormData
): Promise<CreateBiddingActionState> {
  const supabase = createClient();
  const { userId } = auth();
  const fields = Object.fromEntries(formData.entries());

  try {
    if (!userId || !fields.bidId || !fields.dialogType)
      throw new Error("Missing fields");
    let dbError;
    if (fields.dialogType === "reject") {
      sendEmail('rejected');
      const { error } = await supabase
        .from("bids")
        .delete()
        .eq("id", fields.bidId);
      dbError = error;
    } else {
      sendEmail('accepted');
      // const { error } = await supabase
      //   .from("bids")
      //   .delete()
      //   .eq("id", fields.bidId);
      // dbError = error;
    }

    if (dbError) throw new Error(`Supabase error: ${dbError}`);
    revalidatePath("/open-bids");
    return {
      message: `Successfully ${fields.dialogType}ed bid`,
      type: "success",
    };
  } catch (error) {
    console.log(`Failed to ${fields.dialogType} bidding: `, error);
    return {
      message: `Failed to ${fields.dialogType} bidding`,
      type: "error",
    };
  }
}
