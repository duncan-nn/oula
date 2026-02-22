'use client'

import { useState } from 'react'
import Calendar from './Calendar'
import TimePicker from './TimePicker'
import { bookings } from '@/dataset/bookings';
import CosmeticCategory from './CosmeticCategory';
import CosmeticService from './CosmeticService';
import GuestDetails, { UserDetails } from './GuestDetails';
import Review from './Review';
import { getBookingDateTimes, getServiceById } from '@/services/cosmetic';
import { generateId } from '@/lib/utils';

import { motion } from 'framer-motion'
import Image from "next/image";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const steps = [
  {
    id: "Step 1",
    name: "Select Treatment Category",
    desc: "Choose the type of cosmetic treatment you’re interested in."
  },
  {
    id: "Step 2",
    name: "Choose Your Service",
    desc: "Select a specific treatment that fits your needs and goals."
  },
  { 
    id: "Step 3", 
    name: "Select Preferred Date",
    desc: "Pick a date that works best for your appointment."
  },
  {
    id: "Step 4",
    name: "Choose Available Time",
    desc: "Select an available time slot for your chosen service."
  },
  { 
    id: "Step 5", 
    name: "Enter Your Details",
    desc: "Provide your contact information so we can confirm your booking."
  },
  { 
    id: "Step 6", 
    name: "Review & Confirm Booking",
    desc: "Double-check your appointment details before final confirmation."
  }
];

interface UserBookingInfo {
  userCosmeticCategory: string;
  userServiceId: string;
  userDate: string;
  startDateTime: Date;
  userDetails: UserDetails
}

export default function Booking () {
    const [userCosmeticCategory, setUserCosmeticCategory] = useState<string>("");
    const [userServiceId, setUserServiceId] = useState<string>("");
    const [userDate, setUserDate] = useState<string>("");
    const [startDateTime, setDateTime] = useState<Date  | null>(null);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const [booking, setBooking] = useState<Booking>({
            id: "",
            serviceId: "",
            startDatetime: '',
            endDatetime: '',
            fullName: "",
            mobileNumber: "",
            email: ""
    });

    const generateBookingObject = () => {
        const _id = generateId()
        let data: Booking = {
            id: "",
            serviceId: "",
            startDatetime: "",
            endDatetime: "",
            fullName: "",
            mobileNumber: "",
            email: "",
        };
        if (startDateTime && service && userDetails) {
            const _dateTimes = getBookingDateTimes(startDateTime, service.duration);
            data = {
                id: _id,
                serviceId: service?.id,
                startDatetime: _dateTimes.startDatetime,
                endDatetime: _dateTimes.endDatetime,
                fullName: userDetails?.fullName,
                mobileNumber: userDetails?.mobileNumber,
                email: userDetails?.email
            }
        }
        return data
    }

    const [errors, setErrors] = useState<
        Partial<Record<keyof UserBookingInfo, string>>
    >({});

    const isUserInfoComplete = (data: UserDetails): boolean => {
        return Object.values(data).every(
            (value) => typeof value === "string" && value.trim() !== ""
        );
    };

    const service = getServiceById(userServiceId);


    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep


    const isCurrentStepValid = (step: number): boolean => {
        const newErrors: typeof errors = {};
        let isValid = false;

        if (step === 0) {
            //const isSet = userCosmeticCategory.trim().length > 0;
            if(userCosmeticCategory.trim().length > 0) {
                isValid = true;
            }else {
                newErrors.userCosmeticCategory = "Select a category";
                isValid = false;
            }
        }
        if (step === 1) {

            if(userServiceId.trim().length > 0) {
                isValid = true;
            }else {
                newErrors.userServiceId = "Select a service";
                isValid = false;
            }
        }
        if (step === 2) {
            if(userDate.trim().length > 0) {
                isValid = true;
            }else {
                newErrors.userDate = "Pick a date";
                isValid = false;
            }
        }
        if (step === 3) {
            if(startDateTime instanceof Date && !isNaN(startDateTime.getTime())) {
                isValid = true;
            }else {
                newErrors.startDateTime = "Pick a Time for your schedule";
                isValid = false;
            }
        }
        if (step === 4) {
            if (!userDetails) {
                newErrors.userDetails = "Enter your details";
                isValid = false;
            }else {
                const canProceed = isUserInfoComplete(userDetails);
                if(canProceed) {
                    const bookingData = generateBookingObject()
                    // save object
                    setBooking(bookingData)
                    isValid = true;
                }else {
                    newErrors.userDetails = "Enter your details";
                    isValid = false;
                }
            };
        }
        if (step === 5) {
            isValid = true;
        }
        // console.log("Selected time:", slot);
        setErrors(newErrors);
        //return Object.keys(newErrors).length === 0;
        return isValid;
    };

    const next = () => {
        const _isValid = isCurrentStepValid(currentStep);

        if (!_isValid) return

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 5) {
                // await handleSubmit(processForm)()
            }
            setPreviousStep(currentStep)
            setCurrentStep(step => step + 1)
        }
    }

    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep(step => step - 1)
        }
    }

    return (
        <div className="booking">

            <div className="sidebar">
                <div className='wrapper'>
                    <Image
                    src="/images/oula-logo-trans.png"
                    alt="Example image"
                    width={60}
                    height={0} // required but overridden by style
                    className='sidebar-logo'
                    />
                    <nav aria-label='progress' className='nav-progress'>
                        <ol className="steps" role="list">
                            {steps.map((step, index) => {
                                let stateClass = 'step--upcoming';

                                if (currentStep > index) {
                                stateClass = 'step--completed';
                                } else if (currentStep === index) {
                                stateClass = 'step--current';
                                }

                                return (
                                <li key={step.id} className={`step ${stateClass}`}>
                                    <div
                                    className="step__content"
                                    aria-current={currentStep === index ? 'step' : undefined}
                                    >
                                    <span className="step__id">{step.id}</span>
                                    <span className="step__name">{step.name}</span>
                                    </div>
                                </li>
                                );
                            })}
                        </ol>
                    </nav>
                </div>
            </div>

            <div className="main">
                <div className='wrapper'>
                    <div className="booking-head">
                        <h3>Step {currentStep + 1}/{steps.length}</h3>
                        <h1>{steps[currentStep].name}</h1>
                        <h5>{steps[currentStep].desc}</h5>
                    </div>
                    <div className="booking-body">
                        {currentStep === 0 && (
                            <motion.div
                            className="step-wrap"
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="error-div">
                                    {errors.userCosmeticCategory && (
                                        <p className="error-text">{errors.userCosmeticCategory}</p>
                                    )}
                                </div>
                                <CosmeticCategory
                                userCosmeticCategory={userCosmeticCategory}
                                setUserCosmeticCategory={setUserCosmeticCategory}/>
                            </motion.div>
                        )}
                        {currentStep === 1 && (
                            <motion.div
                            className="step-wrap"
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="error-div">
                                    {errors.userServiceId && (
                                        <p className="error-text">{errors.userServiceId}</p>
                                    )}
                                </div>
                                <CosmeticService 
                                userCosmeticCategory={userCosmeticCategory}
                                userServiceId={userServiceId}
                                setUserServiceId={setUserServiceId}
                                />
                            </motion.div>
                        )}
                        {currentStep === 2 && (
                            <motion.div
                            className="step-wrap"
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="error-div">
                                    {errors.userDate && (
                                        <p className="error-text">{errors.userDate}</p>
                                    )}
                                </div>
                                { service ? (
                                        <Calendar
                                        userDate={userDate}
                                        serviceDuration={service.duration}
                                        setUserDate={setUserDate}
                                        />
                                    ) : (
                                        <p>Go back and select a service</p>
                                    )
                                }
                            </motion.div>
                        )}
                        {currentStep === 3 && (
                            <motion.div
                            className="step-wrap"
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="error-div">
                                    {errors.startDateTime && (
                                        <p className="error-text">{errors.startDateTime}</p>
                                    )}
                                </div>
                                { service ? (
                                    <TimePicker
                                    selectedDay={new Date(userDate)}
                                    bookings={bookings}
                                    serviceDurationMinutes={service.duration}
                                    // onSelect={(time) => { console.log("Selected time:", time);}}
                                    startDateTime={startDateTime}
                                    setDateTime={setDateTime}
                                    />
                                    ) : (
                                        <p>Go back and select a date</p>
                                    )
                                }
                            </motion.div>
                        )}
                        {currentStep === 4 && (
                            <motion.div
                            className="step-wrap"
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="error-div">
                                    {errors.userDetails && (
                                        <p className="error-text">{errors.userDetails}</p>
                                    )}
                                </div>
                                <GuestDetails
                                initialData={userDetails ?? undefined}
                                onNext={(data) => {
                                    setUserDetails(data);
                                    //setStep(2);
                                }}/>
                            </motion.div>
                        )}
                        {currentStep === 5 && (
                            <motion.div
                            className="step-wrap"
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                                <div className="error-div">
                                    {/* {errors.userDetails && (
                                        <p className="error-text">{errors.userDetails}</p>
                                    )} */}
                                </div>
                                <Review booking={booking}/>
                            </motion.div>
                        )}
                    </div>
                    <div className="booking-slider-control">
                        <div className='wrapper'>
                            <button
                            type='button'
                            onClick={prev}
                            disabled={currentStep === 0}
                            // className='btns btn-prev'
                            className={[
                            "btns btn-prev",
                            currentStep === 0 ? "hide-btn" : "",
                            ].join(" ")}
                            >
                                <FontAwesomeIcon icon={faArrowLeftLong} className="_icon _icon-prev" />
                                <span className="span-prev">Prev</span>
                            </button>
                            <button
                            type='button'
                            onClick={next}
                            disabled={currentStep === steps.length - 1}
                            //className='btns btn-next'
                            className={[
                            "btns btn-next",
                            // currentStep === steps.length - 1? "hide-btn" : "",
                            ].join(" ")}
                            >
                                <span className="span-next">{currentStep === steps.length - 1? "Confirm" : "Next"}</span>
                                <FontAwesomeIcon icon={faArrowRightLong} className="_icon _icon-next" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}