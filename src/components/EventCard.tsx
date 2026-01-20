import Link from "next/link";
import { Heart } from "lucide-react";
import type { EventData } from "@/data/events";

export default function EventCard({ event }: { event: EventData }) {
  // Parsing date for display (Mock logic for now, assuming standard format)
  // "Sat, Aug 16, 2026 - 7:30 PM"
  const dateParts = event.date.split(" ");
  const month = dateParts[1];
  const day = dateParts[2].replace(",", "");
  const time = dateParts.slice(4).join(" ");

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-sm transition-all hover:shadow-lg">
      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center bg-gray-200"
          style={{ backgroundImage: `url("${event.image}")` }}
        />
        <button className="absolute right-3 top-3 rounded-full bg-white/80 p-1.5 transition hover:bg-white text-gray-600 hover:text-red-500">
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-1 p-4">
        {/* Date Column */}
        <div className="mr-4 flex flex-col items-center text-[#1f262d]">
          <span className="text-xs font-bold uppercase text-[#c0192d]">{month}</span>
          <span className="text-xl font-normal">{day}</span>
        </div>

        {/* Info Column */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3 className="line-clamp-2 text-base font-bold leading-5 text-black group-hover:underline">
              {event.title}
            </h3>
            <p className="mt-1 text-sm text-[#444444]">{event.venue} • {event.city}</p>
            <p className="mt-1 text-sm text-[#444444]">{time}</p>
          </div>

          <div className="mt-4">
            <Link
              href="/queue"
              className="inline-block rounded-[3px] border border-[#026cdf] px-4 py-1.5 text-sm font-semibold text-[#026cdf] transition hover:bg-[#026cdf] hover:text-white"
            >
              See Tickets
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
