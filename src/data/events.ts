export type EventData = {
  id: string;
  title: string;
  venue: string;
  date: string;
  city: string;
  image: string;
};

export const btsEvent: EventData = {
  id: "bts",
  title: "BTS WORLD TOUR 'ARIRANG' IN TORONTO",
  venue: "Rogers Centre",
  date: "Thu, Jan 22, 2026 - 7:00 PM",
  city: "Toronto, ON",
  image: "/BTS.jpg"
};

export const events: EventData[] = [
  {
    ...btsEvent,
    id: "1"
  },
  {
    id: "2",
    title: "Bruno Mars - The Romantic Tour",
    venue: "Crypto.com Arena",
    date: "Fri, Sep 12, 2026 - 8:00 PM",
    city: "Los Angeles, CA",
    image: "/bruno.png"
  },
  {
    ...btsEvent,
    id: "3"
  },
  {
    id: "4",
    title: "Lakers vs. Celtics",
    venue: "Crypto.com Arena",
    date: "Tue, Dec 25, 2026 - 5:00 PM",
    city: "Los Angeles, CA",
    image: "/lakers.avif"
  },
  {
    ...btsEvent,
    id: "5"
  },
  {
    id: "6",
    title: "Comedy All-Stars",
    venue: "Laugh Factory",
    date: "Fri, Aug 29, 2026 - 9:00 PM",
    city: "Long Beach, CA",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedee5?q=80&w=2070&auto=format&fit=crop"
  },
  {
    ...btsEvent,
    id: "7"
  },
  {
    id: "8",
    title: "Lakers vs. Celtics",
    venue: "Crypto.com Arena",
    date: "Tue, Dec 25, 2026 - 5:00 PM",
    city: "Los Angeles, CA",
    image: "/lakers.avif"
  }
];
