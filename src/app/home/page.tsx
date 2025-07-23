"use client";

import Image from "next/image";

const HomePage = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-lamaSkyLight p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <h1 className="text-2xl font-bold">SchooLama</h1>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Welcome to School Management System
        </h2>
        
        <p className="text-gray-600 mb-8">
          Access your dashboard by selecting your role below:
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => window.location.href = '/admin'}
            className="bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors"
          >
            👨‍💼<br />
            <span className="text-sm">Admin</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/teacher'}
            className="bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            👨‍🏫<br />
            <span className="text-sm">Teacher</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/student'}
            className="bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            🎓<br />
            <span className="text-sm">Student</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/parent'}
            className="bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition-colors"
          >
            👨‍👩‍👧‍👦<br />
            <span className="text-sm">Parent</span>
          </button>
        </div>
        
        <div className="text-center space-y-2">
          <button
            onClick={() => window.location.href = '/debug'}
            className="text-sm text-gray-500 hover:text-gray-700 underline block w-full"
          >
            Debug Page
          </button>
          
          <button
            onClick={() => {
              localStorage.clear();
              window.location.reload();
            }}
            className="text-sm text-gray-500 hover:text-gray-700 underline block w-full"
          >
            Clear Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;