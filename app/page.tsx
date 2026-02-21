import BookingComp from "@/components/BookingComp";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "OULA Organic Beauty | Natural Cosmetic Treatments & Skin Rejuvenation",
  description: "Enhance your natural beauty with personalized, organic-inspired cosmetic treatments at OULA Organic Beauty. Safe, subtle results in a calm, luxury setting.",
};

export default function Home() {
  return (
    <div 
    className="home-page"
    style={{ backgroundImage: `url('${'/images/h1.jpg'}')`}}>
      <Image
      src="/images/oula-logo-white.png"
      alt="Brand logo"
      width={0}
      height={0}
      sizes="100vw"
      className="brand-image"
      />
      <div className="page-detail">
        <h1>Reveal Your Most Confident Self</h1>
        <p>Personalized cosmetic treatments designed to enhance your natural beauty— safely, subtly, beautifully.</p>
        <div className="cta-div">
          <Link href={"/booking"}
          className="cta-btn">
            Book Your Consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
