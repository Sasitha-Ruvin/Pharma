"use client"
import React from 'react'
import RoleCountChart from "@/components/RoleCountChart";
import EmployeeFrequencyChart from "@/components/DateJoinedChart";
import SideBar from "@/components/SideBar";
import CustomerChart from '@/components/ClientTypeChart';
import TierRingChart from '@/components/ClientTierChart';
import CustomerBarChart from '@/components/ClientOrderTotal';

const page = () => {
  return (
    <div className='flex h-screen'>
        <SideBar/>
        <div className='bg-[#F7F8FA] flex-1 p-8 overflow-y-auto'>
          <h1 className='text-black text-4xl text-center mb-5 font-bold'>Client Reports</h1>
            <div className='flex flex-row gap-5 justify-evenly items-center'>
            <CustomerChart/>
            <TierRingChart/>
            </div>
            <div className='grid grid-cols-2 gap-3 mt-10'>
              <CustomerBarChart/>

            </div>
           
        </div>

    </div>
  )
}

export default page