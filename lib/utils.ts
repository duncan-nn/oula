// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";
import {
  isSameDay,
  differenceInMinutes,
  isBefore,
  parseISO
} from 'date-fns';

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

 export const stripOuterTags = (str: string) => {
    return str
      .replace(/<[^>]*>/g, '')   // remove all tags
      .replace(/\n/g, '')        // remove newline characters
      .trim();  
  };

interface IsFullyBookedParams {
  bookings: Booking[];
  date: Date; // day to check
  serviceDurationMinutes: number;
  dayStart: Date;
  dayEnd: Date;
}

export function isFullyBooked({
  bookings,
  date,
  serviceDurationMinutes,
  dayStart,
  dayEnd,
}: IsFullyBookedParams): boolean {
  // Only bookings for this specific day
  const dayBookings = bookings.filter((b) =>
    isSameDay(parseISO(b.startDatetime), date)
  );

  // Parse and sort
  const sorted = dayBookings
    .map((b) => ({
      start: parseISO(b.startDatetime),
      end: parseISO(b.endDatetime),
    }))
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  let lastEnd = dayStart;

  for (const booking of sorted) {
    const gapMinutes = differenceInMinutes(booking.start, lastEnd);

    if (gapMinutes >= serviceDurationMinutes) {
      // Enough continuous free time
      return false;
    }

    if (isBefore(lastEnd, booking.end)) {
      lastEnd = booking.end;
    }
  }

  // Remaining time after last booking
  const remainingMinutes = differenceInMinutes(dayEnd, lastEnd);

  if (remainingMinutes >= serviceDurationMinutes) {
    return false;
  }

  return true;
}
  
// export function formatDateToYMD(date: Date): string {
//   return date.toISOString().split("T")[0];
// }

export function formatDateToYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const generateId = (): string => {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 10)
  );
};


export function formatBookingDateTime(
  datetimeString: string,
  serviceDuration: number
) {
  const start = new Date(datetimeString);

  // Calculate end time
  const end = new Date(start.getTime() + serviceDuration * 60 * 1000);

  // Format date
  const dateString = start.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Format time
  const startTime = start.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const endTime = end.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const timeRange = `${startTime} – ${endTime}`;

  return {
    dateString,
    timeRange,
  };
}