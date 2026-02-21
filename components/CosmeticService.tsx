"use client";

import { cosmeticServices } from '@/dataset/services';

interface CosmeticServiceProps {
  userCosmeticCategory: string;
  userServiceId: string
  setUserServiceId: React.Dispatch<React.SetStateAction<string>>;
}

export default function CosmeticService({
  userCosmeticCategory,
  userServiceId,
  setUserServiceId,
}: CosmeticServiceProps) {

    const filteredServices = cosmeticServices.filter(
        (service) => service.category === userCosmeticCategory
    );

    const handleServiceClick = (id: string) => {
        setUserServiceId(id);
    };

  return (
    <div className='cosmetic-services'>
        {filteredServices.map((service) => (
            <button 
            key={service.id} 
            className={[
            "item-btn",
            userServiceId === service.id ? "selected" : "",
            ].join(" ")}
            onClick={() => handleServiceClick(service.id)}
            >
                <div className='top'>
                  <h1>{service.name}</h1>
                  <h5>{service.description}</h5>
                </div>
                <div className='bottom'>
                  <div className='bottom-left'>${service.price}</div>
                  <div className='bottom-right'><span>Duration:</span> {service.duration}Mins</div>
                </div>
            </button>
        ))}
    </div>
  );
}
