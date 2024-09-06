"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateBiddingActionState, deleteListing } from "@/lib/actions";
import { Listing } from "@/lib/types";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

function TruckerListingDialog({ listing }: { listing: Listing }) {
  const initialState: CreateBiddingActionState = { message: "" };
  const [state, formAction] = useFormState(deleteListing, initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (state.message) {
      toast(state.message, {
        description:
          state.type === "success"
            ? `Trucker has been notified`
            : state.type === "error"
            ? `Ensure all fields are filled in`
            : "",
      });
    }

    if (state.type === "success") {
      setIsDialogOpen(false);
    }
  }, [state]);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="mt-1.5 absolute right-4" variant={"outline"}>
          Remove
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl">Remove Listing</DialogTitle>
          <DialogDescription>
            Are you sure you want to remove this listing?
          </DialogDescription>
        </DialogHeader>

        <form action={formAction}>
          <input type="hidden" name="listingId" value={listing.id} />
          <Button type="submit" className="w-full" variant={"destructive"}>
            {"Yes, I'm sure"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default TruckerListingDialog;
