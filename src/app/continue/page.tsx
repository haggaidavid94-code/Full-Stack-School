"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const ContinuePage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  console.log("ContinuePage - User loaded:", isLoaded);
  console.log("ContinuePage - User signed in:", isSignedIn);
  console.log("ContinuePage - User ID:", user?.id);
  console.log("ContinuePage - User unsafeMetadata:", (user as any)?.unsafeMetadata);

  useEffect(() => {
    if (isLoaded) {
      console.log("ContinuePage - User is loaded, checking authentication...");
      
      if (isSignedIn && user) {
        console.log("ContinuePage - User is signed in");
        
        // Check if user has a role assigned
        const userRole = (user as any).unsafeMetadata?.role;
        console.log("ContinuePage - User role:", userRole);
        
        setIsRedirecting(true);
        
        if (userRole && ['admin', 'teacher', 'student', 'parent'].includes(userRole)) {
          // User has a valid role, redirect to their dashboard
          console.log("ContinuePage - User has valid role, redirecting to dashboard:", `/${userRole}`);
          setTimeout(() => {
            router.push(`/${userRole}`);
          }, 1500);
        } else {
          // User doesn't have a role, redirect to role selection
          console.log("ContinuePage - User has no role, redirecting to role selection");
          setTimeout(() => {
            router.push('/select-role');
          }, 1500);
        }
      } else {
        // User is not signed in, redirect to home/sign-in
        console.log("ContinuePage - User not signed in, redirecting to home");
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    }
  }, [isLoaded, isSignedIn, user, router]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <h1 className="text-2xl font-bold">SchooLama</h1>
        </div>
        
        {!isLoaded ? (
          <>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Loading...
            </h2>
            <p className="text-gray-600">
              Please wait while we verify your account
            </p>
          </>
        ) : isRedirecting ? (
          <>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Account Verified Successfully!
            </h2>
            <p className="text-gray-600">
              {(user as any)?.unsafeMetadata?.role 
                ? `Redirecting to your ${(user as any).unsafeMetadata.role} dashboard...`
                : "Redirecting to role selection..."
              }
            </p>
          </>
        ) : (
          <>
            <div className="text-4xl mb-4">✅</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Verification Complete!
            </h2>
            <p className="text-gray-600 mb-6">
              Your email has been verified successfully.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => router.push('/select-role')}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Continue to Role Selection
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </>
        )}
        
        {/* Debug information for troubleshooting */}
        <div className="mt-6 p-3 bg-gray-100 rounded text-xs text-left">
          <div><strong>Debug Info:</strong></div>
          <div>Loaded: {isLoaded ? 'Yes' : 'No'}</div>
          <div>Signed In: {isSignedIn ? 'Yes' : 'No'}</div>
          <div>User ID: {user?.id || 'None'}</div>
          <div>Role: {(user as any)?.unsafeMetadata?.role || 'None'}</div>
        </div>
      </div>
    </div>
  );
};

export default ContinuePage;