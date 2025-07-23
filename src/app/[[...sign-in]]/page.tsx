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
    // Clean up any undefined values that might be causing issues
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole');
      if (storedRole === 'undefined' || storedRole === 'null') {
        localStorage.removeItem('userRole');
      }
      // Clear all localStorage role data - we'll rely on Clerk privateMetadata only
      localStorage.removeItem('userRole');
    }

    if (isLoaded && isSignedIn && user) {
      // Only check privateMetadata - ignore localStorage
      const userRole = (user as any).privateMetadata?.role;
      
      console.log("LoginPage - User ID:", user.id);
      console.log("LoginPage - privateMetadata:", user.privateMetadata);
      console.log("LoginPage - userRole:", userRole);
      
      // Make sure we have a valid role from Clerk privateMetadata
      if (userRole && typeof userRole === 'string' && ['admin', 'teacher', 'student', 'parent'].includes(userRole)) {
        // Only redirect if we have a valid role in privateMetadata
        console.log("LoginPage - Valid role found in privateMetadata, redirecting to", `/${userRole}`);
        window.location.href = `/${userRole}`;
        return;
      } else {
        // User is signed in but has no valid role in privateMetadata - show role selection
        console.log("LoginPage - No valid role in privateMetadata, showing role selection");
        setShowRoleSelection(true);
      }
    } else if (isLoaded && !isSignedIn) {
      // User is not signed in - show home page or login
      console.log("LoginPage - User not signed in, showing home page");
      setShowHomePage(true);
    }
  }, [user, isLoaded, isSignedIn]);

  // Show role selection if user is signed in but has no role
  if (showRoleSelection && isSignedIn) {
    return (
      <ErrorBoundary>
        <RoleSelection />
      </ErrorBoundary>
    );
  }

  // Show home page for non-signed-in users or as fallback
  if (showHomePage || (!isLoaded && !isSignedIn)) {
    return (
      <ErrorBoundary>
        <div className="h-screen flex items-center justify-center bg-lamaSkyLight p-4">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Image src="/logo.png" alt="Logo" width={32} height={32} />
              <h1 className="text-2xl font-bold">SchooLama</h1>
            </div>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              School Management System
            </h2>
            
            <p className="text-gray-600 mb-8">
              Select your role to access your dashboard:
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => {
                  localStorage.setItem('userRole', 'admin');
                  window.location.href = '/admin';
                }}
                className="bg-red-500 text-white py-4 px-4 rounded-lg hover:bg-red-600 transition-colors"
              >
                <div className="text-2xl mb-1">👨‍💼</div>
                <div className="text-sm font-medium">Administrator</div>
              </button>
              
              <button
                onClick={() => {
                  localStorage.setItem('userRole', 'teacher');
                  window.location.href = '/teacher';
                }}
                className="bg-blue-500 text-white py-4 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <div className="text-2xl mb-1">👨‍🏫</div>
                <div className="text-sm font-medium">Teacher</div>
              </button>
              
              <button
                onClick={() => {
                  localStorage.setItem('userRole', 'student');
                  window.location.href = '/student';
                }}
                className="bg-green-500 text-white py-4 px-4 rounded-lg hover:bg-green-600 transition-colors"
              >
                <div className="text-2xl mb-1">🎓</div>
                <div className="text-sm font-medium">Student</div>
              </button>
              
              <button
                onClick={() => {
                  localStorage.setItem('userRole', 'parent');
                  window.location.href = '/parent';
                }}
                className="bg-purple-500 text-white py-4 px-4 rounded-lg hover:bg-purple-600 transition-colors"
              >
                <div className="text-2xl mb-1">👨‍👩‍👧‍👦</div>
                <div className="text-sm font-medium">Parent</div>
              </button>
            </div>
            
            <div className="text-center space-y-3">
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Having issues?</p>
                <button
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.reload();
                  }}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors text-sm"
                >
                  Clear All Data & Refresh
                </button>
              </div>
              
              <button
                onClick={() => setShowHomePage(false)}
                className="text-sm text-blue-500 hover:text-blue-700 underline"
              >
                or Sign In Here
              </button>
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="h-screen flex items-center justify-center bg-lamaSkyLight">
      {!isSignUp ? (
        // SIGN IN FORM
        <SignIn.Root>
          <SignIn.Step
            name="start"
            className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
          >
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Image src="/logo.png" alt="" width={24} height={24} />
              SchooLama
            </h1>
            <h2 className="text-gray-400">Sign in to your account</h2>
            <Clerk.GlobalError className="text-sm text-red-400" />
            <Clerk.Field name="identifier" className="flex flex-col gap-2">
              <Clerk.Label className="text-xs text-gray-500">
                Username or Email
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="p-2 rounded-md ring-1 ring-gray-300"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            <Clerk.Field name="password" className="flex flex-col gap-2">
              <Clerk.Label className="text-xs text-gray-500">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="p-2 rounded-md ring-1 ring-gray-300"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>
            <SignIn.Action
              submit
              className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px]"
            >
              Sign In
            </SignIn.Action>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </SignIn.Step>
        </SignIn.Root>
      ) : (
        // SIGN UP FORM
        <SignUp.Root>
          <SignUp.Step
            name="start"
            className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
          >
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Image src="/logo.png" alt="" width={24} height={24} />
              SchooLama
            </h1>
            <h2 className="text-gray-400">Create your account</h2>
            <Clerk.GlobalError className="text-sm text-red-400" />
            
            <Clerk.Field name="emailAddress" className="flex flex-col gap-2">
              <Clerk.Label className="text-xs text-gray-500">
                Email Address
              </Clerk.Label>
              <Clerk.Input
                type="email"
                required
                className="p-2 rounded-md ring-1 ring-gray-300"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>

            <Clerk.Field name="password" className="flex flex-col gap-2">
              <Clerk.Label className="text-xs text-gray-500">
                Password
              </Clerk.Label>
              <Clerk.Input
                type="password"
                required
                className="p-2 rounded-md ring-1 ring-gray-300"
              />
              <Clerk.FieldError className="text-xs text-red-400" />
            </Clerk.Field>

            <SignUp.Action
              submit
              className="bg-green-500 text-white my-1 rounded-md text-sm p-[10px]"
            >
              Sign Up
            </SignUp.Action>
            
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-500 hover:underline font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>
          </SignUp.Step>

          <SignUp.Step
            name="verifications"
            className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-2"
          >
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Image src="/logo.png" alt="" width={24} height={24} />
              SchooLama
            </h1>
            <h2 className="text-gray-400">Verify your email</h2>
            <p className="text-sm text-gray-500 mb-4">
              We sent a verification code to your email address
            </p>
            
            <SignUp.Strategy name="email_code">
              <Clerk.Field name="code" className="flex flex-col gap-2">
                <Clerk.Label className="text-xs text-gray-500">
                  Verification Code
                </Clerk.Label>
                <Clerk.Input
                  type="text"
                  required
                  className="p-2 rounded-md ring-1 ring-gray-300"
                  placeholder="Enter 6-digit code"
                />
                <Clerk.FieldError className="text-xs text-red-400" />
              </Clerk.Field>
              <SignUp.Action
                submit
                className="bg-green-500 text-white my-1 rounded-md text-sm p-[10px]"
              >
                Verify Email
              </SignUp.Action>
            </SignUp.Strategy>
          </SignUp.Step>
        </SignUp.Root>
      )}
    </div>
    </ErrorBoundary>
  );
};

export default LoginPage;
