"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createBidding, CreateBiddingActionState } from "@/lib/actions";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import TooltipWrapper from "./wrappers/tooltip-wrapper";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import { Listing } from "@/lib/types";

function ListingsBidDialog({ listing }: { listing: Listing }) {
  const initialState: CreateBiddingActionState = { message: "" };
  const [state, formAction] = useFormState(createBidding, initialState);
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
      <DialogTrigger>
        <TooltipWrapper
          tooltipContent={"Place Bid"}
          triggerContent={
            <ClipboardDocumentCheckIcon className="mt-0 absolute right-4 w-6 h-6 cursor-pointer" />
          }
        />
      </DialogTrigger>
      <DialogContent className="bg-background">
        <DialogHeader>
          <DialogTitle className="text-2xl">Place Bid</DialogTitle>
        </DialogHeader>
        <form action={formAction}>
          <input type="hidden" name="listingId" value={listing.id} />
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-semibold">Trip details</span>
              <div className="grid grid-cols-2">
                <span className="text-gray-500">From</span>
                <span>{listing.from}</span>
                <span className="text-gray-500">To</span>
                <span>{listing.to}</span>
                <span className="text-gray-500">Leaving</span>
                <span>
                  {format(new Date(listing.dateLeaving), "dd MMM - hh:mm")}
                </span>
                <span className="text-gray-500">Arriving</span>
                <span>
                  {format(new Date(listing.dateArriving), "dd MMM - hh:mm")}
                </span>
              </div>
            </div>

            <div>
              <span className="font-semibold">Trucker details</span>
              <div className="grid grid-cols-2">
                <span className="text-gray-500">Trucker</span>
                <span>{listing.truck}</span>
                <span className="text-gray-500">Truck</span>
                <span>{listing.truckId}</span>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="grid grid-cols-1">
                <span className="font-semibold">Ask price</span>
                <span>{formatCurrency(listing.expectedCost)}</span>
              </div>
              <div className="grid grid-cols-1">
                <label htmlFor="bidPrice" className="font-semibold">
                  Bid price
                </label>
                <Input
                  type="number"
                  min={listing.expectedCost}
                  name="bidPrice"
                  id="bidPrice"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full mt-8">
            Bid
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ListingsBidDialog;
