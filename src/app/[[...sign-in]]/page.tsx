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
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check for role in publicMetadata first, then localStorage
      const publicRole = user?.publicMetadata?.role;
      const storageRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
      const role = publicRole || storageRole;

      if (role) {
        // Use window.location for more reliable redirect
        window.location.href = `/${role}`;
        return;
      } else {
        // User is signed in but has no role - show role selection
        setShowRoleSelection(true);
      }
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
