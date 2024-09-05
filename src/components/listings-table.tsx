import { createClient } from "@/utils/server";
import ListingsPagination from "./pagination";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
} from "./ui/table";
import { ListingSearchParams } from "@/app/listings/page";
import { format } from "date-fns";
const LISTINGS_PER_PAGE = 10;

const data = [
  {
    id: "1",
    truckId: "T12345",
    truckerId: "TR56789",
    from: "Johannesburg",
    to: "Cape Town",
    dateLeaving: "2024-08-01T08:00:00",
    dateArriving: "2024-08-02T18:00:00",
    distance: 1400.5,
    expectedCost: 3000.0,
    createdAt: "2024-07-15T12:30:00",
    updatedAt: "2024-07-16T14:45:00",
  },
  {
    id: "1",
    truckId: "T67890",
    truckerId: "TR12345",
    from: "Durban",
    to: "Pretoria",
    dateLeaving: "2024-08-05T06:00:00",
    dateArriving: "2024-08-05T16:00:00",
    distance: 600.75,
    expectedCost: 1800.5,
    createdAt: "2024-07-20T11:00:00",
    updatedAt: "2024-07-21T13:20:00",
  },
  {
    id: "1",
    truckId: "T54321",
    truckerId: "TR98765",
    from: "Port Elizabeth",
    to: "Bloemfontein",
    dateLeaving: "2024-08-10T07:30:00",
    dateArriving: "2024-08-10T18:00:00",
    distance: 800.3,
    expectedCost: 2500.75,
    createdAt: "2024-07-25T09:45:00",
    updatedAt: "2024-07-26T10:30:00",
  },
];

async function ListingTable({
  searchParams,
}: {
  searchParams: ListingSearchParams;
}) {
  const supabase = createClient();
  const currentPage = searchParams.page || 1;
  const from = (currentPage - 1) * LISTINGS_PER_PAGE;
  const to = currentPage * LISTINGS_PER_PAGE - 1;

    const {
      data: listings,
      count: totalCount,
      error,
    } = await supabase
      .from("listings")
      .select("*", { count: "exact" })
      .range(from, to);
//   const listings = data;

    if (error) {
      return <>Error fetching listings</>;
    }

  if (!listings) {
    return <>Loading</>;
  }

    const totalPages = Math.ceil((totalCount || 0) / LISTINGS_PER_PAGE);

  return (
    <Table className="border">
      <TableHeader>
        <TableHead>From</TableHead>
        <TableHead>Destination</TableHead>
        <TableHead>Leaving</TableHead>
        <TableHead>Arriving</TableHead>
        <TableHead>Distance(km)</TableHead>
        <TableHead>Expected Cost(R)</TableHead>
      </TableHeader>
      <TableBody>
        {listings.map((listing) => (
          <TableRow key={listing.id}>
            <TableCell>{listing.from}</TableCell>
            <TableCell>{listing.to}</TableCell>
            <TableCell>
              {format(new Date(listing.dateLeaving), "dd MMM - hh:mm")}
            </TableCell>
            <TableCell>
              {format(new Date(listing.dateLeaving), "dd MMM - hh:mm")}
            </TableCell>
            <TableCell>{listing.distance}</TableCell>
            <TableCell>{listing.expectedCost}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-transparent">
        <TableRow>{<ListingsPagination totalPages={totalPages} />}</TableRow>
      </TableFooter>
    </Table>
  );
}

export default ListingTable;
