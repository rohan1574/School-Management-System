"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const events = [
  { id: 1, title: "Event 1", time: "12:00 PM - 2:00 PM", description: "Details about Event 1" },
  { id: 2, title: "Event 2", time: "2:00 PM - 3:00 PM", description: "Details about Event 2" },
  { id: 3, title: "Event 3", time: "3:00 PM - 4:00 PM", description: "Details about Event 3" },
];

const EventCalendar = () => {
  const [value, setValue] = useState<Value | null>(null);

  useEffect(() => {
    setValue(new Date()); // Ensures consistent initialization.
  }, []);

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-4">Events</h1>
        <Image src="/moreDark.png" alt="More options" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-300 text-xs">{event.time}</span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendar;
