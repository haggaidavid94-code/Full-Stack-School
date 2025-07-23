"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
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
