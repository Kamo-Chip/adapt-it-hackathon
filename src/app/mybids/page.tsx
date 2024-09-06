/**
 * v0 by Vercel.
 * @see https://v0.dev/t/kX6WjXZvwCs
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Pagination } from "@/components/ui/pagination"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("amount")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [bidsPerPage, setBidsPerPage] = useState(10)
  const [selectedListing, setSelectedListing] = useState(null)
  const bids = [
    {
      id: 1,
      bidderName: "John Doe",
      amount: 2500,
      deliveryTimeline: "5 days",
      listing: "Truck 1",
    },
    {
      id: 2,
      bidderName: "Jane Smith",
      amount: 2300,
      deliveryTimeline: "7 days",
      listing: "Truck 2",
    },
    {
      id: 3,
      bidderName: "Bob Johnson",
      amount: 2800,
      deliveryTimeline: "3 days",
      listing: "Truck 1",
    },
    {
      id: 4,
      bidderName: "Alice Williams",
      amount: 2400,
      deliveryTimeline: "6 days",
      listing: "Truck 3",
    },
    {
      id: 5,
      bidderName: "Tom Davis",
      amount: 2600,
      deliveryTimeline: "4 days",
      listing: "Truck 2",
    },
    {
      id: 6,
      bidderName: "Sara Lee",
      amount: 2700,
      deliveryTimeline: "5 days",
      listing: "Truck 3",
    },
    {
      id: 7,
      bidderName: "Mike Brown",
      amount: 2100,
      deliveryTimeline: "8 days",
      listing: "Truck 1",
    },
    {
      id: 8,
      bidderName: "Emily Wilson",
      amount: 2900,
      deliveryTimeline: "2 days",
      listing: "Truck 2",
    },
    {
      id: 9,
      bidderName: "David Anderson",
      amount: 2200,
      deliveryTimeline: "7 days",
      listing: "Truck 3",
    },
    {
      id: 10,
      bidderName: "Lisa Taylor",
      amount: 2400,
      deliveryTimeline: "6 days",
      listing: "Truck 1",
    },
    {
      id: 11,
      bidderName: "Chris Martinez",
      amount: 2700,
      deliveryTimeline: "4 days",
      listing: "Truck 2",
    },
    {
      id: 12,
      bidderName: "Samantha Hernandez",
      amount: 2500,
      deliveryTimeline: "5 days",
      listing: "Truck 3",
    },
  ]
  const filteredBids = bids.filter((bid) => bid.bidderName.toLowerCase().includes(searchTerm.toLowerCase()))
  const sortedBids = filteredBids.sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1
    return 0
  })
  const indexOfLastBid = currentPage * bidsPerPage
  const indexOfFirstBid = indexOfLastBid - bidsPerPage
  const currentBids = sortedBids.slice(indexOfFirstBid, indexOfLastBid)
  const totalPages = Math.ceil(sortedBids.length / bidsPerPage)
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
    setCurrentPage(1)
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const handleListingChange = (listing) => {
    setSelectedListing(listing)
    setCurrentPage(1)
  }
  const listingOptions = Array.from(new Set(bids.map((bid) => bid.listing)))
  return (
    <div className="flex flex-col h-full">
      
      <div className="flex items-center justify-between bg-background px-6 py-4 border-b">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search bids..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 rounded-md w-full bg-muted text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <TruckIcon className="w-5 h-5" />
                <span>{selectedListing ? selectedListing : "All Listings"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Listing</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleListingChange(null)}>All Listings</DropdownMenuItem>
              {listingOptions.map((listing) => (
                <DropdownMenuItem key={listing} onClick={() => handleListingChange(listing)}>
                  {listing}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <ListOrderedIcon className="w-5 h-5" />
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={sortBy} onValueChange={handleSort}>
                <DropdownMenuRadioItem value="amount">Bid Amount</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="deliveryTimeline">Bid Made On</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FilterIcon className="w-5 h-5" />
                <span>Bids per page</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={bidsPerPage.toString()}
                onValueChange={(value) => setBidsPerPage(parseInt(value))}
              >
                <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="20">20</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full table-auto">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("listing")}>
                Listing
                {sortBy === "listing" && <span className="ml-2">{sortOrder === "asc" ? "\u2191" : "\u2193"}</span>}
              </th>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("bidderName")}>
                Bidder Name
                {sortBy === "bidderName" && <span className="ml-2">{sortOrder === "asc" ? "\u2191" : "\u2193"}</span>}
              </th>
              <th className="px-4 py-3 text-right cursor-pointer" onClick={() => handleSort("amount")}>
                Bid Amount
                {sortBy === "amount" && <span className="ml-2">{sortOrder === "asc" ? "\u2191" : "\u2193"}</span>}
              </th>
              <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort("deliveryTimeline")}>
Bid Made On                {sortBy === "deliveryTimeline" && (
                  <span className="ml-2">{sortOrder === "asc" ? "\u2191" : "\u2193"}</span>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentBids
              .filter((bid) => selectedListing === null || bid.listing === selectedListing)
              .map((bid) => (
                <tr key={bid.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-left">{bid.listing}</td>
                  <td className="px-4 py-3 text-left">{bid.bidderName}</td>
                  <td className="px-4 py-3 text-right">${bid.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-left">{bid.deliveryTimeline}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="bg-background px-6 py-4 border-t">
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  )
}

function FilterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function ListOrderedIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function TruckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  )
}