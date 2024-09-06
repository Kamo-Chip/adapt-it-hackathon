import ListingsTableSkeleton from "@/components/listings-table-skeleton";
import PageHeader from "@/components/page-header";
// import OpenBidsTable from "@/components/trucker/open-bids-table";
import BasicDateFilter from "@/components/basic-date-filter";
import dynamic from "next/dynamic";
const MyBidsTable = dynamic(
  () => import("@/components/consignee/my-bids-table"),
  {
    loading: () => <ListingsTableSkeleton />,
    ssr: false,
  }
);
export type MyBidsSearchParams = {
  date?: string;
  page?: number;
};
function Page({ searchParams }: { searchParams: MyBidsSearchParams }) {
  return (
    <div>
      <PageHeader title="My bids" />
      <BasicDateFilter />
      <MyBidsTable searchParams={searchParams} />
    </div>
  );
}

export default Page;
