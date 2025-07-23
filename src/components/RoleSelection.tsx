"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const RoleSelection = () => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      id: "admin",
      title: "Administrator",
      description: "Full system access - manage all users, classes, and settings",
      icon: "👨‍💼",
      color: "bg-red-50 border-red-200 hover:bg-red-100"
    },
    {
      id: "teacher", 
      title: "Teacher",
      description: "Manage classes, students, assignments, and take attendance",
      icon: "👨‍🏫",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100"
    },
    {
      id: "student",
      title: "Student", 
      description: "View grades, assignments, schedule, and attendance",
      icon: "🎓",
      color: "bg-green-50 border-green-200 hover:bg-green-100"
    },
    {
      id: "parent",
      title: "Parent",
      description: "Monitor your child's academic progress and attendance",
      icon: "👨‍👩‍👧‍👦",
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100"
    }
  ];

  const handleRoleSelect = async (role: string) => {
    setIsLoading(true);
    try {
      // Use Clerk's proper method to update user metadata
      await user?.update({
        unsafeMetadata: {
          role: role
        }
      });
      
      // Also try to set in publicMetadata via a custom approach
      // This might require a server action in a real app
      
      // For now, redirect and let the useEffect handle the routing
      window.location.reload();
    } catch (error) {
      console.error("Error setting role:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image src="/logo.png" alt="" width={32} height={32} />
            <h1 className="text-2xl font-bold">SchooLama</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Welcome! Choose your role
          </h2>
          <p className="text-gray-600">
            Select your role to access the appropriate dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              disabled={isLoading}
              className={`p-6 rounded-lg border-2 text-left transition-all duration-200 ${role.color} ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <div className="text-3xl mb-2">{role.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{role.title}</h3>
              <p className="text-sm text-gray-600">{role.description}</p>
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="text-center mt-6">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500 mr-2"></div>
              Setting up your account...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelection;