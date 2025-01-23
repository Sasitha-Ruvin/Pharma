"use client"
import React from 'react'
import RoleCountChart from "@/components/RoleCountChart";
import EmployeeFrequencyChart from "@/components/DateJoinedChart";
import SideBar from "@/components/SideBar";
import EmployeeStatusChart from '@/components/EmployeeStatusChart';

const page = () => {
  return (
    <div className='flex h-screen'>
        <SideBar/>
        <div className='bg-[#F7F8FA] flex-1 p-8 overflow-y-auto'>
            <div className='grid grid-cols-2 gap-5'>
            <EmployeeFrequencyChart/>
            <RoleCountChart/>
            <EmployeeStatusChart/>

            </div>
           
        </div>

    </div>
  )
}

export default page