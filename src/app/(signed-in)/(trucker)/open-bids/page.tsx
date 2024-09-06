import BasicDateFilter from "@/components/basic-date-filter";
import ListingsTableSkeleton from "@/components/listings-table-skeleton";
import PageHeader from "@/components/page-header";

// import OpenBidsTable from "@/components/trucker/open-bids-table";
import dynamic from "next/dynamic";
const OpenBidsTable = dynamic(
  () => import("@/components/trucker/open-bids-table"),
  {
    loading: () => <ListingsTableSkeleton />,
    ssr: false,
  }
);
export type OpenBidsSearchParams = {
  date?: string;
  page?: number;
};
function Page({ searchParams }: { searchParams: OpenBidsSearchParams }) {
  return (
    <div>
      <PageHeader title="Open bids" />
      <BasicDateFilter />
      <OpenBidsTable searchParams={searchParams} />
    </div>
  );
}

export default Page;
