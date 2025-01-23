"use client"
import React from 'react'
import RoleCountChart from "@/components/RoleCountChart";
import EmployeeFrequencyChart from "@/components/DateJoinedChart";
import SideBar from "@/components/SideBar";
import EmployeeStatusChart from '@/components/EmployeeStatusChart';
import MedicationRingChart from '@/components/MedCategory';
import MedicationPieChart from '@/components/MedQuantityChart';
import MedicationTypeChart from '@/components/MedType';
import ExpiringMedicationsCard from '@/components/Cards/ExpireCard';
import LowStockMedicationsCard from '@/components/Cards/LowStockMedicationCard';

const page = () => {
  return (
    <div className='flex h-screen'>
        <SideBar/>
        <div className='bg-[#F7F8FA] flex-1 p-8 overflow-y-auto'>
            <div className='grid grid-cols-2 gap-5'>
            <MedicationRingChart/>
            <MedicationPieChart/>
            <MedicationTypeChart/>
            <div className='flex flex-col gap-5'>
                <ExpiringMedicationsCard/>
                <LowStockMedicationsCard/>

            </div>
            </div>
           
        </div>

    </div>
  )
}

export default page