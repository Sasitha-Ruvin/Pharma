'use client'  //this part is always necessary when we show front end stuff, when adding data we should use 'use server', maybe when we add employees and mediactions

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Dashboard = () => {
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Retrieve the role from sessionStorage
    const storedRole = sessionStorage.getItem("role");
    setRole(storedRole);
    
    // Redirect to login page
    if (!storedRole) {
      router.push("/login");
    }
  }, [router]);

//   this part just handles logout
  const handleLogout = () => {
    sessionStorage.removeItem("role"); 
    router.push("/login"); // Redirect to the login page
  };


// Dashboard is just a basic we can change it in next sprint i guess
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 space-y-8 bg-white shadow-md rounded-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-700">Dashboard</h2>
        <div className="space-y-4">
        <>
              <Link href={'/users/index'}>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Manage Employee</button>
              </Link>
              <Link href={'/products/index'}>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Manage Product</button>
              </Link>
              <Link href={'/suppliers/index'}>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Manage Suppliers</button>
              </Link>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Manage Order</button>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Manage Client</button>
        </>    
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
