"use client";

import {
  addMinutes,
  format,
  isAfter,
  isBefore,
  isSameDay,
  parseISO,
} from "date-fns";
import clsx from "clsx";

type Props = {
  selectedDay: Date;
  bookings: Booking[];
  serviceDurationMinutes: number;
  // onSelect: (time: Date) => void;
  startDateTime: Date | null;
  setDateTime: React.Dispatch<React.SetStateAction<Date | null>>;
};

export default function TimePicker({
  selectedDay,
  bookings,
  serviceDurationMinutes,
  // onSelect,
  startDateTime,
  setDateTime,
}: Props) {
  const DAY_START_HOUR = 8;
  const DAY_END_HOUR = 18;
  const SLOT_INTERVAL = 30;

  // Build working hours range
  const dayStart = new Date(selectedDay);
  dayStart.setHours(DAY_START_HOUR, 0, 0, 0);

  const dayEnd = new Date(selectedDay);
  dayEnd.setHours(DAY_END_HOUR, 0, 0, 0);

  // Only bookings for this day
  const dayBookings = bookings
    .filter((b) =>
      isSameDay(parseISO(b.startDatetime), selectedDay)
    )
    .map((b) => ({
      start: parseISO(b.startDatetime),
      end: parseISO(b.endDatetime),
    }));

  // Generate time slots
  const timeSlots: Date[] = [];
  let current = dayStart;

  while (isBefore(current, dayEnd)) {
    timeSlots.push(current);
    current = addMinutes(current, SLOT_INTERVAL);
  }

  // Check if slot overlaps a booking
  function isBooked(slotStart: Date): boolean {
    const slotEnd = addMinutes(slotStart, SLOT_INTERVAL);

    return dayBookings.some(
      (b) =>
        isBefore(slotStart, b.end) &&
        isAfter(slotEnd, b.start)
    );
  }

  // Check if service fits continuously from slot
  function canFitService(slotStart: Date): boolean {
    const serviceEnd = addMinutes(
      slotStart,
      serviceDurationMinutes
    );

    // Must end within working hours
    if (isAfter(serviceEnd, dayEnd)) return false;

    return !dayBookings.some(
      (b) =>
        isBefore(slotStart, b.end) &&
        isAfter(serviceEnd, b.start)
    );
  }

  const handleSlotClick = (slot: Date) => {
    setDateTime(slot);
    // console.log("Selected time:", slot);
    // console.log("State time:", startDateTime);
  };

  return (
    <div className="time-slot-container">
      {timeSlots.map((slot) => {
        const booked = isBooked(slot);
        const fitsService = canFitService(slot);
        const disabled = booked || !fitsService;

        return (
          <button
            key={slot.toISOString()}
            disabled={disabled}
            onClick={() => handleSlotClick(slot)}
            // className={clsx(
            //   "rounded-md border px-4 py-2 text-sm transition",
            //   disabled
            //     ? "cursor-not-allowed bg-gray-100 text-gray-400"
            //     : "bg-white hover:bg-black hover:text-white"
            // )}
            className={[
            "time-slot-btn",
            disabled ? "time-slot-btn--disabled" : "",
            startDateTime?.getTime() === slot.getTime() ? "selected" : "",
            ].join(" ")}
          >
            {format(slot, "h:mm a")}
          </button>
        );
      })}
    </div>
  );
}
