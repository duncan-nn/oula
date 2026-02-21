import { z } from 'zod'

export const BookingFormDataSchema = z.object({
  serviceTypeId: z.number().min(1, 'Select a service type'),
  serviceId: z.number().min(1, 'Select a service'),
  date: z.string().min(1, 'Pick a date for your schedule'),
  time: z.string().min(1, 'pick a time for your schedule'),
  fullname: z.string().min(3, 'Type in your full name'),
  mobileNumber: z.string().min(10, 'Enter your mobile number'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address')
})

export const GuestFormDataSchema = z.object({
  fullname: z.string().min(3, 'Type in your full name'),
  mobileNumber: z.string().min(10, 'Enter your mobile number'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address')
})
