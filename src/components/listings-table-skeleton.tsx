import React from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
} from "./ui/table"; // Ensure correct imports
import { Skeleton } from "./ui/skeleton";
import { LISTINGS_PER_PAGE } from "./listings-table";

function ListingsTableSkeleton() {
  const skeletonRows = Array.from({ length: LISTINGS_PER_PAGE }); // Create 5 skeleton rows

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
        {skeletonRows.map((_, index) => (
          <TableRow key={index} className="relative">
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-3/4" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-3/4" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-1/2" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-1/2" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-8 w-12" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="bg-transparent">
        <TableRow>
          <Skeleton className="h-8 w-full" />
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default ListingsTableSkeleton;
