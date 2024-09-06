"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateBiddingActionState, handleBid } from "@/lib/actions";
import { Bid } from "@/lib/types";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function OpenBidsDialog({ bid }: { bid: Bid }) {
  const initialState: CreateBiddingActionState = { message: "" };
  const [state, formAction] = useFormState(handleBid, initialState);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"accept" | "reject">();
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
    <>
      <Popover>
        <PopoverTrigger>
          <EllipsisHorizontalIcon className="w-6 h-6 mt-2.5 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent className="w-[100px] grid grid-cols-1 p-0">
          <div
            className="cursor-pointer hover:bg-border p-2"
            onClick={() => {
              setDialogType("accept");
              setIsDialogOpen(true);
            }}
          >
            Accept
          </div>

          <div
            className="cursor-pointer hover:bg-border p-2"
            onClick={() => {
              setDialogType("reject");
              setIsDialogOpen(true);
            }}
          >
            Reject
          </div>
        </PopoverContent>
      </Popover>
      {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-background">
            <DialogHeader>
              <DialogTitle className="text-2xl capitalize">
                {dialogType} Bid
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to {dialogType} this bid?
              </DialogDescription>
            </DialogHeader>

            <form action={formAction}>
              <input type="hidden" name="bidId" value={bid.id} />
              <input type="hidden" name="dialogType" value={dialogType} />
              <Button
                type="submit"
                className="w-full"
                variant={dialogType === "reject" ? "destructive" : "default"}
              >
                {"Yes, I'm sure"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default OpenBidsDialog;
