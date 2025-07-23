"use client";

import Image from "next/image";
import { useEffect } from "react";

const RootPage = () => {
  useEffect(() => {
    // Clear any undefined values that might be causing issues
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'undefined' || storedRole === 'null') {
      localStorage.removeItem('userRole');
    }
  }, []);

  return (
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
        </div>
      </div>
    </div>
  );
};

export default RootPage;