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
import { TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import TooltipWrapper from "../wrappers/tooltip-wrapper";

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
            ? `Cannot remove. Listing has active bids`
            : "",
      });
    }

    if (state.type === "success") {
      setIsDialogOpen(false);
    }
  }, [state]);
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger>
        <TooltipWrapper
          triggerContent={
            <TrashIcon
              className="mt-0 absolute right-4 w-6 h-6 cursor-pointer"
              onClick={() => console.log(listing)}
            />
          }
          tooltipContent={"Remove"}
        />
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
