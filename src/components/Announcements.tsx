"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Announcements = () => {
  const { user } = useUser();
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    // For demo purposes, using mock announcement data
    // In a real app, you'd fetch this from an API based on the user's role
    setAnnouncements([
      {
        id: 1,
        title: "Welcome to the new school year!",
        description: "We're excited to start another great year of learning.",
        date: new Date(),
        class: { name: "General" }
      },
      {
        id: 2,
        title: "Parent-Teacher Conference",
        description: "Schedule your meeting with your child's teacher.",
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        class: { name: "4A" }
      },
      {
        id: 3,
        title: "School Holiday",
        description: "School will be closed next Monday.",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        class: null
      }
    ]);
  }, [user]);

  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-400">View All</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {announcements.map((announcement) => (
          <div
            className="bg-lamaSkyLight rounded-md p-4"
            key={announcement.id}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{announcement.title}</h2>
              <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                {announcement.date.toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {announcement.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;
