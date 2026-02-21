"use client";
import Image from "next/image";
import { cosmeticCategories } from '@/dataset/services';

interface ServiceTypeIdProps {
  userCosmeticCategory: string;
  setUserCosmeticCategory: React.Dispatch<React.SetStateAction<string>>;
}


export default function CosmeticCategory({
  userCosmeticCategory,
  setUserCosmeticCategory,
}: ServiceTypeIdProps) {


    const handleTypeClick = (category: string) => {
        setUserCosmeticCategory(category);
    };

  return (
        <div className='cosmetic-category'>
            {cosmeticCategories.map((cat) => (
                <button 
                key={cat} 
                className={[
                "item-btn",
                userCosmeticCategory === cat ? "selected" : "",
                ].join(" ")}
                onClick={() => handleTypeClick(cat)}>
                  <Image
                  src={`/images/${cat}.png`}
                  alt={`${cat} image`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className={"category-image"}
                  />
                  <h3>{cat}</h3>
                </button>
            ))}
        </div>
  );
}