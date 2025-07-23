"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";

const TeacherPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user) {
      const userRole = (user as any).unsafeMetadata?.role;
      
      console.log("TeacherPage - User ID:", user.id);
      console.log("TeacherPage - unsafeMetadata:", (user as any).unsafeMetadata);
      console.log("TeacherPage - userRole:", userRole);
      
      // Check if user has a role assigned
      if (!userRole) {
        console.log("TeacherPage - No role found, redirecting to select-role");
        router.push("/select-role");
        return;
      }
      
      // Check if user has teacher role
      if (userRole !== "teacher") {
        console.log("TeacherPage - User role is not teacher, redirecting to", `/${userRole}`);
        router.push(`/${userRole}`);
        return;
      }
      
      console.log("TeacherPage - User has teacher role, allowing access");
    }
  }, [user, isLoaded, router]);

  // Show loading while checking authentication
  if (!isLoaded || !user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Show loading while role is being verified
  if (!(user as any).unsafeMetadata?.role) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendarContainer type="teacherId" id={user.id!} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;