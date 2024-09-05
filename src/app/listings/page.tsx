import ListingTable from "@/components/listings-table";
import PageHeader from "@/components/page-header";
import DatePicker from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import { Suspense } from "react";

export type ListingSearchParams = {
  page?: number;
};

export default function Listing({
  searchParams,
}: {
  searchParams: ListingSearchParams;
}) {
  return (
    <div>
      <PageHeader title="Loads" />
      <div className="flex max-w-[400px] mb-6 gap-4">
        <Input type="text" placeholder="From" />
        <Input type="text" placeholder="To" />
        <DatePicker />
      </div>

      <Suspense fallback={<span>Loading</span>}>
        <ListingTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
