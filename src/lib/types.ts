type Listing = {
  truckId: string;
  truckerId: string;
  from: string;
  destination: string;
  dateLeaving: string; // ISO date string
  dateArriving: string; // ISO date string
  distance: number;
  expectedCost: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
