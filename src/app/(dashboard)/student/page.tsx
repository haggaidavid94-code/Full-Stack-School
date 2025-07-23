"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import EventCalendar from "@/components/EventCalendar";

const StudentPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [classData, setClassData] = useState<any>(null);

  useEffect(() => {
    if (isLoaded && user) {
      const userRole = user.privateMetadata?.role;
      
      console.log("StudentPage - User ID:", user.id);
      console.log("StudentPage - privateMetadata:", user.privateMetadata);
      console.log("StudentPage - userRole:", userRole);
      
      // Check if user has a role assigned
      if (!userRole) {
        console.log("StudentPage - No role found, redirecting to select-role");
        router.push("/select-role");
        return;
      }
      
      // Check if user has student role
      if (userRole !== "student") {
        console.log("StudentPage - User role is not student, redirecting to", `/${userRole}`);
        router.push(`/${userRole}`);
        return;
      }
      
      console.log("StudentPage - User has student role, allowing access");
      
      // Fetch class data for the student
      fetchClassData();
    }
  }, [user, isLoaded, router]);

  const fetchClassData = async () => {
    try {
      // For demo purposes, using a mock class ID
      // In a real app, you'd fetch this from an API based on the student's enrollment
      setClassData({ id: 1, name: "4A" });
    } catch (error) {
      console.error("Error fetching class data:", error);
      setClassData({ id: 1, name: "4A" }); // Fallback
    }
  };

  // Show loading while checking authentication
  if (!isLoaded || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show loading while role is being verified
  if (!user.privateMetadata?.role) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">
            Schedule ({classData?.name || "Loading..."})
          </h1>
          {classData && (
            <BigCalendarContainer type="classId" id={classData.id} />
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;