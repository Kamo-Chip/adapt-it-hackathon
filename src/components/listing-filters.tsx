"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import DatePicker from "./ui/date-picker";
import { Input } from "./ui/input";
import { useEffect } from "react";

function ListingFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {}, [searchParams]);
  return (
    <div className="flex mb-6 gap-4">
      <div className="flex max-w-[500px] gap-4">
        <Input type="text" placeholder="From" />
        <Input type="text" placeholder="To" />
        <DatePicker />
      </div>

      {Object.keys(Object.fromEntries(searchParams.entries())).filter(
        (item) => item !== "page"
      ).length >= 1 && (
        <Button
          variant={"secondary"}
          className="ml-auto"
          onClick={() => replace(`${pathname}`)}
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}

export default ListingFilters;
