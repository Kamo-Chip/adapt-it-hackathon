"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";

function BasicDateFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  useEffect(() => {}, [searchParams]);
  return (
    <div className="flex mb-6 gap-4">
      <div className="flex max-w-[500px] gap-4">
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

export default BasicDateFilter;
