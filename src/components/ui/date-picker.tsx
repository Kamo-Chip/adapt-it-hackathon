"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DatePicker() {
  const [date, setDate] = useState<Date>();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  type ListingFilter = {
    type: "from" | "to" | "date";
    value: string;
  };

  // Use useCallback to ensure setFilters is stable
  const setFilters = useCallback((filter: ListingFilter) => {
    const params = new URLSearchParams(searchParams);
    if (filter.type) {
      params.set("date", filter.value);
    } else {
      params.delete(filter.type);
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, replace, pathname]);

  useEffect(() => {
    if (date) {
      setFilters({ type: "date", value: date.toISOString().split("T")[0] });
    }
  }, [date, setFilters]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd MMM") : <span>Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
