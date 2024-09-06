export type Listing = {
  id: string;
  truckId: string;
  truck: number;
  truckerId: string;
  from: string;
  to: string;
  dateLeaving: string; // ISO date string
  dateArriving: string; // ISO date string
  distance: number;
  expectedCost: number;
  created_at: string; // ISO date string
  updatedAt: string; // ISO date string
};

export type Bid = {
  id: string;
  created_at: string;
  price: number;
  consigneeId: string;
  listingId: number;
};
