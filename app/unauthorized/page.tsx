'use client';

import { useRouter } from 'next/navigation';

export default function Unauthorized() {
  const router = useRouter();

  const handleGoBack = () => {
    window.history.go(-2); // Navigate back to the previous page
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">Unauthorized</h1>
        <p className="text-gray-600 mt-2">You do not have permission to access this page.</p>
        <button
          onClick={handleGoBack}
          className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
