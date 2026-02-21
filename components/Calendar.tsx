"use client";
import { useState } from "react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isToday,
  parse,
  parseISO,
  startOfToday,
  isBefore,
  startOfDay, setHours, setMinutes,
} from "date-fns";
import { formatDateToYMD, isFullyBooked } from "@/lib/utils";
import { bookings } from '@/dataset/bookings';


interface UserDateProps {
  userDate: string;
  serviceDuration: number;
  setUserDate: React.Dispatch<React.SetStateAction<string>>;
}

type ClassValue = string | false | null | undefined;

function classNames(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}

// ----------------------
// COMPONENT
// ----------------------
export default function Calendar({
  userDate,
  serviceDuration,
  setUserDate,
}: UserDateProps) {

  const today = startOfToday();

  //const [selectedDay, setSelectedDay] = useState<Date>(today);
  const [currentMonth, setCurrentMonth] = useState<string>(
    format(today, "MMM-yyyy")
  );

  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  // const selectedDayMeetings = bookings.filter((m) =>
  //   isSameDay(parseISO(m.startDatetime), selectedDay)
  // );

  const handleDayClick = (day: Date) => {
      //setSelectedDay(day);
      const _day = formatDateToYMD(day);
      setUserDate(_day);
      console.log("Day is: " + _day);
  };

  // ----------------------
  // NAVIGATION
  // ----------------------
  const goPrev = (): void => {
    const prev = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(prev, "MMM-yyyy"));
  };

  const goNext = (): void => {
    const next = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(next, "MMM-yyyy"));
  };

//   const fullyBooked = isFullyBooked({
//   meetings,
//   serviceDurationMinutes: 60,
//   dayStart: new Date("2026-02-09T09:00:00"),
//   dayEnd: new Date("2026-02-09T17:00:00"),
// });

  
  // ----------------------
  // JSX
  // ----------------------
  return (
    <div className="calendar-container">
      <div className="calendar-left">
        <div className="calendar-header">
          <h2>{format(firstDayCurrentMonth, "MMMM yyyy")}</h2>

          <div className="month-buttons">
            <button onClick={goPrev}>←</button>
            <button onClick={goNext}>→</button>
          </div>
        </div>

        <div className="weekday-row">
          <div>S</div><div>M</div><div>T</div><div>W</div>
          <div>T</div><div>F</div><div>S</div>
        </div>

        <div className="days-grid">
          {days.map((day, dayIdx) => (
            <div 
            key={day.toISOString()} 
            // className="day-cell"
            className={`day-cell ${classNames(dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}`}>
              <button
                disabled={isBefore(startOfDay(day), startOfDay(new Date())) || isFullyBooked({bookings, date: day, serviceDurationMinutes: serviceDuration, dayStart: setMinutes(setHours(day, 8), 0), dayEnd: setMinutes(setHours(day, 18), 0)})}
                className={[
                "day-button",
                isBefore(startOfDay(day), startOfDay(new Date())) ? "dimmed" : "",
                // !isSameMonth(day, firstDayCurrentMonth) ? "dimmed" : "",
                isToday(day) ? "today" : "",
                // isEqual(day, selectedDay) ? "selected" : "",
                userDate === formatDateToYMD(day) ? "selected" : "",
                isFullyBooked({bookings, date: day, serviceDurationMinutes: serviceDuration, dayStart: setMinutes(setHours(day, 8), 0), dayEnd: setMinutes(setHours(day, 18), 0)}) ? "dimmed" : "",
                ].join(" ")}
                onClick={() => handleDayClick(day)}
              >
                {format(day, "d")}
              </button>

              {bookings.some((m) =>
                isSameDay(parseISO(m.startDatetime), day)
              ) && <div className="dot"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* <div className="calendar-right">
        <h2>Schedule for {format(selectedDay, "MMM dd, yyyy")}</h2>

        {selectedDayMeetings.length === 0 && (
          <p>No meetings for this day.</p>
        )}

        <ul className="meeting-list">
          {selectedDayMeetings.map((m) => (
            <li className="meeting-item" key={m.id}>
              <img src={m.imageUrl} alt="" className="avatar" />
              <div>
                <p className="meeting-name">{m.fullName}</p>
                <p className="meeting-time">
                  {format(parseISO(m.startDatetime), "h:mm a")} –{" "}
                  {format(parseISO(m.endDatetime), "h:mm a")}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div> */}
      
    </div>
  );
}


let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]
