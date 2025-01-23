'use client'

import SideBar from '@/components/SideBar'
import CustomTextField from '@/components/ui/CustomTextField'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const page = () => {
    const [isFormDirty, setIsFormDirty] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
      });
      const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
        setIsFormDirty(true);
    };

    const handleSubmit = async (e:React.FormEvent)=>{
      e.preventDefault();
      try {
        const response = await fetch('/api/medicationname',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(formData),
        });

        if(response.ok){
          Swal.fire({
            title:'Success',
            text:'Medication Name Added',
            icon:'success',
            confirmButtonText:'OK'
          });
          router.push('/products/index');
        }else{
          Swal.fire({
            title: "Error",
            text: 'Failed to Add Name',
            icon: 'error',
            confirmButtonText: 'Try Again'
        });
        }
        
      } catch (error) {
        
      }
    }

  return (
    <div className='flex h-screen'>
        <SideBar/>

        <div className="bg-[#F7F8FA] flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Add Medication Name</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <CustomTextField
              label="Medication Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
            /> 
            </div>
          <Button variant="contained" color="primary" className="mt-10" type="submit" >
            Save
          </Button>
        </form>
      </div>

    </div>
  );
}

export default page