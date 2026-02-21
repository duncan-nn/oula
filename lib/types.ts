type Booking = {
  id: string;
  serviceId: string;
  startDatetime: string;
  endDatetime: string;
  fullName: string;
  mobileNumber: string;
  email: string;
};

type CosmeticCategory = 
  | "skin"
  | "aesthetic"
  | "makeup"
  | "hair"
  | "advanced";

type CosmeticService = {
  id: string;
  category: CosmeticCategory;
  name: string;
  description: string;
  duration: number; // minutes
  price: number; // USD
}