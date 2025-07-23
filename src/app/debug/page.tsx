"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const DebugPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const publicRole = user?.publicMetadata?.role;
    
    setDebugInfo({
      isLoaded,
      isSignedIn,
      userId: user?.id,
      publicRole,
      localStorageRole: role,
      timestamp: new Date().toISOString()
    });

    // Auto redirect if we have a role
    if (role) {
      setTimeout(() => {
        window.location.href = `/${role}`;
      }, 2000);
    }
  }, [user, isLoaded, isSignedIn]);

  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image src="/logo.png" alt="" width={32} height={32} />
            <h1 className="text-2xl font-bold">SchooLama Debug</h1>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold">Debug Information:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
          
          <div className="flex gap-2">
            <button
              onClick={() => window.location.href = '/admin'}
              className="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Go to Admin
            </button>
            <button
              onClick={() => window.location.href = '/teacher'}
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Go to Teacher
            </button>
            <button
              onClick={() => window.location.href = '/student'}
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Go to Student
            </button>
          </div>
          
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = '/';
            }}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Clear Storage & Restart
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebugPage;