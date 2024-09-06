import ListingFilters from "@/components/listing-filters";
import ListingsTableSkeleton from "@/components/listings-table-skeleton";
import PageHeader from "@/components/page-header";

import dynamic from "next/dynamic";

const TruckerListingTable = dynamic(
  () => import("@/components/trucker/listings-table"),
  {
    loading: () => <ListingsTableSkeleton />,
    ssr: false,
  }
);
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
      <PageHeader title="My Listings" />
      <ListingFilters />
      <TruckerListingTable searchParams={searchParams} />
    </>
  );
}
