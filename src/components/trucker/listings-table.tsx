import { createClient } from "@/utils/server";
import { addDays, endOfDay, format, startOfDay } from "date-fns";
import ListingsBidDialog from "../listings-bid-dialog";
import ListingsPagination from "../pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import TruckerListingDialog from "./listings-dialog";
import { formatCurrency } from "@/lib/utils";
import { ListingSearchParams } from "@/lib/types";

export const LISTINGS_PER_PAGE = 10;

async function TruckerListingTable({
  searchParams,
}: {
  searchParams: ListingSearchParams;
}) {
  const supabase = createClient();
  const currentPage = searchParams.page || 1;
  const from = (currentPage - 1) * LISTINGS_PER_PAGE;
  const to = currentPage * LISTINGS_PER_PAGE - 1;

  let listings: any[] = [];
  let totalCount = 0;

  const query = supabase
    .from("listings")
    .select("*", { count: "exact" })
    .range(from, to);

  // Add filters conditionally
  if (searchParams.date && !searchParams.to && !searchParams.from) {
    query
      .gte(
        "dateLeaving",
        addDays(startOfDay(new Date(searchParams.date)), 1).toISOString()
      )
      .lte(
        "dateLeaving",
        addDays(endOfDay(new Date(searchParams.date)), 1).toISOString()
      );
  }

  const { data, count, error } = await query;

  if (!data || error) {
    throw new Error("Failed to fetch listings");
  }

  listings = data;
  totalCount = count || 0;
  if (!listings) {
    return <>Loading...</>;
  }

  const totalPages = Math.ceil((totalCount || 0) / LISTINGS_PER_PAGE);

  // Check if no listings are found
  if (listings.length === 0) {
    return <>No listings available.</>;
  }

  return (
    <Table className="border" suppressHydrationWarning>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>Destination</TableHead>
          <TableHead>Leaving</TableHead>
          <TableHead>Arriving</TableHead>
          <TableHead>Distance(km)</TableHead>
          <TableHead>Expected Cost(R)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody suppressHydrationWarning>
        {listings.map((listing) => (
          <TableRow key={listing.id} className="relative">
            <TableCell>{listing.from}</TableCell>
            <TableCell>{listing.to}</TableCell>
            <TableCell>
              {format(new Date(listing.dateLeaving), "dd MMM - hh:mm")}
            </TableCell>
            <TableCell>
              {format(new Date(listing.dateLeaving), "dd MMM - hh:mm")}
            </TableCell>
            <TableCell>{listing.distance}</TableCell>
            <TableCell>{formatCurrency(listing.expectedCost)}</TableCell>
            <TruckerListingDialog listing={listing} />
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

export default TruckerListingTable;
