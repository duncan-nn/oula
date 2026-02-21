import BookingComp from "@/components/BookingComp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Your Appointment | OULA Organic Beauty",
  description: "Schedule your consultation at OULA Organic Beauty in minutes. Choose your treatment, select a time, and secure your personalized cosmetic appointment online.",
};

export default function BookingPage() {
  return (
    <div className="booking-page">
      <BookingComp />
    </div>
  );
}
