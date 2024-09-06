// import ListingTable from "@/components/listings-table";
import ListingFilters from "@/components/listing-filters";
import ListingsTableSkeleton from "@/components/listings-table-skeleton";
import PageHeader from "@/components/page-header";
import { ListingSearchParams } from "@/lib/types";
import dynamic from "next/dynamic";

const ListingTable = dynamic(() => import("@/components/listings-table"), {
  loading: () => <ListingsTableSkeleton />,
  ssr: false,
});

export default async function Listing({
  searchParams,
}: {
  searchParams: ListingSearchParams;
}) {
  return (
    <>
      <PageHeader title="Listings" />
      <ListingFilters />
      {/* <ListingsTableSkeleton /> */}
      {/* <Suspense fallback={<ListingsTableSkeleton />}> */}
      <ListingTable searchParams={searchParams} />
      {/* </Suspense> */}
    </>
  );
}
