import { formatBookingDateTime } from '@/lib/utils';
import { getServiceById } from '@/services/cosmetic';

interface ReviewProps {
  booking: Booking;
}

export default function Review({ booking }: ReviewProps) {
    const service = getServiceById(booking.serviceId);

    let result;

    if (service) { 
        result = formatBookingDateTime(booking.startDatetime, service.duration)
    }

    return (
       <div className="booking-summary">
            <p>
                Please take a moment to review your appointment details below. If everything looks correct, confirm 
                your booking to secure your spot.
            </p>
            <div className="details">
                <div className='item'>
                    <div className='item-section'>
                        <h3>Your Appointment Details</h3>
                        <div className='item-wrap'>
                            <div className='field'><span>Treatment Category:</span></div>
                            <div className='value'><span>{service?.category}</span></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='field'><span>Service Selected:</span></div>
                            <div className='value'><span>{service?.name}</span></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='field'><span>Date:</span></div>
                            <div className='value'><span>{result?.dateString}</span></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='field'><span>Time:</span></div>
                            <div className='value'><span>{result?.timeRange}</span></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='field'><span>Duration:</span></div>
                            <div className='value'><span>{service?.duration} Minutes</span></div>
                        </div>
                    </div>

                    <div className='item-section'>
                        <h3>Your Information</h3>
                        <div className='item-wrap'>
                            <div className='field'><span>Full Name:</span></div>
                            <div className='value'><span>{booking.fullName}</span></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='field'><span>Mobile Number:</span></div>
                            <div className='value'><span>{booking.mobileNumber}</span></div>
                        </div>
                        <div className='item-wrap'>
                            <div className='field'><span>Email:</span></div>
                            <div className='value'><span className='email'>{booking.email}</span></div>
                        </div>
                    </div>

                </div>
                <div className='item'>
                    <div className='item-section'>
                        <h3>Confirmation</h3>
                        <div className='item-p-wrap'>
                            <p>By confirming this booking, you agree to our clinic policies and 
                                acknowledge that availability is subject to confirmation.
                            </p>
                            <p>
                                Once confirmed, a booking confirmation will be sent to your email 
                                and phone number.
                            </p>
                        </div>
                    </div>
                    <div className='item-section'>
                        {/* <h3></h3> */}
                        <div className='item-p-wrap'>
                            <p>
                                Need to make a change? Use the “Back” button to update 
                                your details.
                            </p>
                        </div>
                    </div>
                </div>
                {/* <h3>ID: {booking.id}</h3>
                <h3>Cosmetic Category: {service?.category}</h3>
                <h3>Service:  {service?.name}</h3>
                <h3>Start Date Time: {booking.startDatetime}</h3>
                <h3>End Date Time: {booking.endDatetime}</h3>
                <h3>Guest Name: {booking.fullName}</h3>
                <h3>Number: {booking.mobileNumber}</h3>
                <h3>Email: {booking.email}</h3> */}
            </div>
       </div>
    )
}
