"use client"
import EmployeeFrequencyChart from '@/components/DateJoinedChart'
import EmployeeOrdersChart from '@/components/EmployeeOrderChart'
import RoleCountChart from '@/components/RoleCountChart'
import SideBar from '@/components/SideBar'
import React from 'react'

const page = () => {
  return (
    <div className='flex h-screen'>
        <SideBar/>
        <div className='bg-[#F7F8FA] flex-1 p-8 overflow-y-auto'>
            <div className='grid grid-cols-2 gap-5'>
                <EmployeeFrequencyChart/>
                <RoleCountChart/>
                <EmployeeOrdersChart/>
            </div>
            
        </div>

    </div>
  )
}

export default page