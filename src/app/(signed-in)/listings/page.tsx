// import ListingTable from "@/components/listings-table";
import ListingFilters from "@/components/listing-filters";
import ListingsTableSkeleton from "@/components/listings-table-skeleton";
import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ListingTable = dynamic(() => import("@/components/listings-table"), {
  loading: () => <ListingsTableSkeleton />,
  ssr: false,
});
export type ListingSearchParams = {
  page?: number;
  date?: string;
  from?: string;
  to?: string;
};

export default async function Listing({
  searchParams,
}: {
  searchParams: ListingSearchParams;
}) {
  return (
    <>
      <PageHeader title="Loads" />
      <ListingFilters />
      {/* <ListingsTableSkeleton /> */}
      {/* <Suspense fallback={<ListingsTableSkeleton />}> */}
      <ListingTable searchParams={searchParams} />
      {/* </Suspense> */}
    </>
  );
}
