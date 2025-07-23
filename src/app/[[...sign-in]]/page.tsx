"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import * as SignUp from "@clerk/elements/sign-up";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import RoleSelection from "@/components/RoleSelection";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect directly to admin dashboard
    router.push('/admin');
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Admin Dashboard...</p>
      </div>
    </div>
  );
};

export default HomePage;
