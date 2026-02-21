'use client'

import { useState, useEffect } from "react";

export interface UserDetails {
  fullName: string;
  mobileNumber: string;
  email: string;
}

interface StepOneProps {
  initialData?: UserDetails;
  onNext: (data: UserDetails) => void;
}

export default function GuestDetails({
  initialData,
  onNext,
}: StepOneProps) {
    const [hasInteracted, setHasInteracted] = useState(false);
    const [formData, setFormData] = useState<UserDetails>({
        fullName: initialData?.fullName ?? "",
        mobileNumber: initialData?.mobileNumber ?? "",
        email: initialData?.email ?? "",
    });

    // Debounced
    const [debounced, setDebounced] = useState<UserDetails>({
        fullName: initialData?.fullName ?? "",
        mobileNumber: initialData?.mobileNumber ?? "",
        email: initialData?.email ?? "",
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebounced(formData)
        }, 1000)
        //console.log("FORMDATA: " +formData);
        return () => {
            clearTimeout(timeout)
        }
    }, [formData])

    useEffect(() => {
        if (!hasInteracted) return; // ⛔ skip initial render
        //console.log("DEBOUNCED: " + debounced);
        if (!validate()) return;
        onNext(debounced);
        // console.log("DEBOUNCED: " + debounced);
    }, [debounced, hasInteracted])

    const [errors, setErrors] = useState<
        Partial<Record<keyof UserDetails, string>>
    >({});

    const validate = (): boolean => {
        const newErrors: typeof errors = {};

        if (!formData.fullName.trim()) {
        newErrors.fullName = "Full name is required";
        }

        if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = "Mobile number is required";
        } else if (!/^\d{10,15}$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = "Enter a valid phone number";
        }

        if (!formData.email.trim()) {
        newErrors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Enter a valid email address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const [touched, setTouched] = useState<Partial<Record<keyof UserDetails, boolean>>>({});

    const handleBlur = (field: keyof UserDetails) => {
        setTouched((prev) => ({ ...prev, [field]: true }));
    };
//   const handleNext = () => {
//     if (!validate()) return;
//     onNext(formData);
//   };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setHasInteracted(true); // 👈 user has started typing
        setFormData((prev) => {
            const updated = { ...prev, [name]: value };
            //console.log(updated);
            return updated;
        });
    };

    return (
        <div className="guest_details">
            <div className="form-wrap">
            {/* Full Name */}
            <div className="form-item">
                <h3>Full Name</h3>
                <input
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                name="fullName"
                onChange={handleChange}
                onBlur={() => handleBlur("fullName")}
                className="input-item"
                />
                {touched.fullName && errors.fullName && (
                    <p className="text-sm text-red-500">{errors.fullName}</p>
                )}
            </div>

            {/* Mobile Number */}
            <div className="form-item">
                <h3>Mobile Number</h3>
                <input
                type="tel"
                placeholder="Mobile number"
                value={formData.mobileNumber}
                name="mobileNumber"
                onChange={handleChange}
                onBlur={() => handleBlur("mobileNumber")}
                className="input-item"
                />
                {touched.mobileNumber && errors.mobileNumber && (
                <p className="text-sm text-red-500">{errors.mobileNumber}</p>
                )}
            </div>

            {/* Email */}
            <div className="form-item">
                <h3>Email</h3>
                <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                name="email"
                onChange={handleChange}
                 onBlur={() => handleBlur("email")}
                className="input-item"
                />
                {touched.email && errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
                )}
            </div>

            {/* Next Button */}
            {/* <button
                type="button"
                onClick={handleNext}
                className="w-full bg-black text-white py-2 rounded"
            >
                Next
            </button> */}
            </div>
        </div>
    )
}