"use server";

import { createClient } from "@/utils/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import axios from 'axios';

async function sendEmail(toEmail: string, statusMessage: string) {
  const url = 'https://api.sendgrid.com/v3/mail/send';
  const apiKey = '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';

  const emailData = {
    personalizations: [
      {
        to: [
          {
            email: toEmail, // Use the toEmail parameter
            name: 'John Doe' // You can pass name dynamically if needed
          }
        ],
        subject: 'Status Update', // You can modify this to a dynamic subject
      }
    ],
    content: [
      {
        type: 'text/plain',
        value: statusMessage // Use the statusMessage parameter
      }
    ],
    from: {
      email: 'office@sebenzo.africa',
      name: 'Sam Smith'
    },
    reply_to: {
      email: 'office@sebenzo.africa',
      name: 'Sam Smith'
    }
  };

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        Authorization: `Bearer ${apiKey}`, // Fixed Authorization header syntax
        'Content-Type': 'application/json'
      }
    });
    console.log('Email sent successfully:', response.data);
  } catch (error) {
    const errorMessage = error?.response?.data || error?.message || 'Unknown error occurred';
    console.error('Error sending email:', errorMessage);
  }
}

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
      const user = await currentUser();
      console.log(user);
      const email = user && user.emailAddresses && user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : "No email available";

      console.log("Email Address:", email);

      sendEmail(email, "You have received a bid on your listing!");
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
  const { userId } = auth();
  const fields = Object.fromEntries(formData.entries());

  try {
    if (!userId || !fields.listingId) throw new Error("Missing fields");
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
      const user = await currentUser();
      console.log(user);
      const email = user && user.emailAddresses && user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : "No email available";

      console.log("Email Address:", email);

      sendEmail(email, "We are sorry to say that your bid has been rejected");
      const { error } = await supabase
        .from("bids")
        .delete()
        .eq("id", fields.bidId);
      dbError = error;
    } else {
      const user = await currentUser();
      console.log(user);
      const email = user && user.emailAddresses && user.emailAddresses.length > 0 ? user.emailAddresses[0].emailAddress : "No email available";

      console.log("Email Address:", email);
      sendEmail(email, "Your bid has been accepted!");
      //sendEmail('accepted');
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
