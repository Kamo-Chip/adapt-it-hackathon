import { formatCurrency } from "@/lib/utils";
import { createClient } from "@/utils/server";
import { format } from "date-fns";
import ListingsPagination from "../pagination";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const LISTINGS_PER_PAGE = 10;

export type MyBidsSearchParams = {
  date?: string;
  page?: number;
};
async function MyBidsTable({
  searchParams,
}: {
  searchParams: MyBidsSearchParams;
}) {
  const supabase = createClient();
  const currentPage = searchParams.page || 1;
  const from = (currentPage - 1) * LISTINGS_PER_PAGE;
  const to = currentPage * LISTINGS_PER_PAGE - 1;

  let bids = [];
  let totalCount = 0;

  const query = supabase
    .from("bids")
    .select("*", { count: "exact" })
    .range(from, to);

  // if (searchParams.date) {
  //   query
  //     .gte(
  //       "dateLeaving",
  //       addDays(startOfDay(new Date(searchParams.date)), 1).toISOString()
  //     )
  //     .lte(
  //       "dateLeaving",
  //       addDays(endOfDay(new Date(searchParams.date)), 1).toISOString()
  //     );
  // }

  const { data, count, error } = await query;

  if (!data || error) {
    throw new Error("Failed to fetch bids");
  }

  bids = data;

  const listingIds = bids.map((bid) => bid.listingId);

  // Fetch the corresponding listings using the listingIds
  const { data: listings, error: listingsError } = await supabase
    .from("listings")
    .select("*")
    .in("id", listingIds); // Assuming "id" is the primary key of listings

  if (!listings || listingsError) {
    throw new Error("Failed to fetch listings");
  }

  // Group the bids by their corresponding listing
  // const groupedBids = listings.map((listing) => {
  //   return {
  //     listing,
  //     bids: bids.filter((bid) => bid.listingId === listing.id),
  //   };
  // });

  totalCount = count || 0;
  if (!bids) {
    return <>Loading...</>;
  }

  const totalPages = Math.ceil((totalCount || 0) / LISTINGS_PER_PAGE);

  // Check if no bids are found
  if (bids.length === 0) {
    return <>No bids available.</>;
  }

  return (
    <Table className="border">
      <TableHeader>
        <TableRow>
          <TableHead>Consignee</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Ask Price</TableHead>
          <TableHead>Bid Date</TableHead>
          <TableHead>Listing ID</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bids.map((bid) => (
          <TableRow key={bid.id} className="relative">
            <TableCell>{bid.consigneeId}</TableCell>
            <TableCell>{formatCurrency(bid.price)} </TableCell>
            <TableCell>
              <Badge className="w-fit">
                {formatCurrency(
                  listings.find((listing) => listing.id === bid.listingId)
                    .expectedCost
                )}
              </Badge>
            </TableCell>
            <TableCell>
              {format(new Date(bid.created_at), "dd MMM - hh:mm")}
            </TableCell>
            <TableCell>{bid.listingId}</TableCell>
            <TableCell>
              <Badge>Pending</Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-transparent">
        <TableRow>
          <TableCell colSpan={6}>
            {<ListingsPagination totalPages={totalPages} />}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default MyBidsTable;
