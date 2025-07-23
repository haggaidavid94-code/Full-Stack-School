"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PostSignUpRedirectProps {
  children: React.ReactNode;
}

const PostSignUpRedirect = ({ children }: PostSignUpRedirectProps) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Check if this is a newly signed up user (no role assigned yet)
      const userRole = (user as any).unsafeMetadata?.role;
      
      if (!userRole) {
        // New user without role - redirect to role selection
        router.push('/select-role');
        return;
      }
      
      // Existing user with role - redirect to dashboard
      router.push(`/${userRole}`);
    }
  }, [isLoaded, isSignedIn, user, router]);

  return <>{children}</>;
};

export default PostSignUpRedirect;