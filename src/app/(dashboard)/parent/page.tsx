"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";

const ParentPage = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    if (isLoaded && user) {
      const userRole = (user as any).privateMetadata?.role;
      
      console.log("ParentPage - User ID:", user.id);
      console.log("ParentPage - privateMetadata:", (user as any).privateMetadata);
      console.log("ParentPage - userRole:", userRole);
      
      // Check if user has a role assigned
      if (!userRole) {
        console.log("ParentPage - No role found, redirecting to select-role");
        router.push("/select-role");
        return;
      }
      
      // Check if user has parent role
      if (userRole !== "parent") {
        console.log("ParentPage - User role is not parent, redirecting to", `/${userRole}`);
        router.push(`/${userRole}`);
        return;
      }
      
      console.log("ParentPage - User has parent role, allowing access");
      
      // Fetch student data for the parent
      fetchStudentData();
    }
  }, [user, isLoaded, router]);

  const fetchStudentData = async () => {
    try {
      // For demo purposes, using mock student data
      // In a real app, you'd fetch this from an API based on the parent's children
      setStudents([
        {
          id: "student1",
          name: "John",
          surname: "Doe",
          classId: 1
        }
      ]);
    } catch (error) {
      console.error("Error fetching student data:", error);
      setStudents([]); // Fallback
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
  if (!(user as any).privateMetadata?.role) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="">
        {students.length > 0 ? (
          students.map((student) => (
            <div className="w-full xl:w-2/3" key={student.id}>
              <div className="h-full bg-white p-4 rounded-md">
                <h1 className="text-xl font-semibold">
                  Schedule ({student.name + " " + student.surname})
                </h1>
                <BigCalendarContainer type="classId" id={student.classId} />
              </div>
            </div>
          ))
        ) : (
          <div className="w-full xl:w-2/3">
            <div className="h-full bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">No students found</h1>
              <p className="text-gray-500">Loading student information...</p>
            </div>
          </div>
        )}
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
