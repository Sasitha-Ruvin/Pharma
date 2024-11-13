'use client';

import React, { useEffect, useState } from 'react';
import { TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Link from 'next/link';
import { roles } from '@/data/roles';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import SideBar from '@/components/SideBar';
import CustomTextField from '@/components/ui/CustomTextField';

const EmployeeForm = () => {
  const router = useRouter();
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: '',
    contact: '',
    dateJoined: '',
    status:'',
  });


  // Styling for React Select
  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '56px',
      fontSize: '16px',
      color: 'black',
      borderColor: '#c4c4c4',
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'black',
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#757575',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: 'black',
      backgroundColor: state.isSelected ? '#e0e0e0' : 'white',
      '&:hover': {
        backgroundColor: '#f5f5f5',
      },
    }),
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setIsFormDirty(true);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
    setIsFormDirty(true);
  };

  const handleRoleChange = (selectedOption: any) => {
    setFormData({
      ...formData,
      role: selectedOption.value,
    });
    setIsFormDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        Swal.fire({
          title:'Employee Added',
          text:'Employee Added Successfully',
          icon:'success',
          confirmButtonText:'OK'
         
        })

        router.push('/users/index');
      } else {
       Swal.fire("Error","Failed to Add Employee",'error');
      }
    } catch (error) {
      console.error('Error Saving Employee', error);
      alert('Error Saving Employee');
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isFormDirty) {
        e.preventDefault();
        e.returnValue = '';  
      }
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isFormDirty]);
  


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar/>
      {/* Main Content */}
      <div className="bg-[#F7F8FA] flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <CustomTextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant='outlined' 
            />
            <CustomTextField
              label="Email"
              fullWidth
              variant="outlined"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            <CustomTextField
              label="Address"
              fullWidth
              variant="outlined"
              name="address"
              onChange={handleChange}
              value={formData.address}
            />
            <CustomTextField
              label="Password"
              fullWidth
              variant="outlined"
              name="password"
              type="password"
              onChange={handleChange}
              value={formData.password}
            />

           <Select
             options={roles}
             onChange={handleRoleChange}
             placeholder="Select Role"
             className="w-full"
             value={roles.find((role) => role.value === formData.role)}
             styles={customSelectStyles}
            />
            <CustomTextField
              label="Contact"
              fullWidth
              variant="outlined"
              name="contact"
              onChange={handleChange}
              value={formData.contact}
            />
            <TextField
              label="Date Joined"
              fullWidth
              variant="outlined"
              name="dateJoined"
              type="date"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              value={formData.dateJoined}
            />
            <div className="col-span-2 mt-4">
              <FormLabel component="legend">Employee Status</FormLabel>
              <RadioGroup row name="employeeStatus" value={formData.status} onChange={handleStatusChange}>
                <FormControlLabel value="Permanent" control={<Radio />} label="Permanent" className='text-black' />
                <FormControlLabel value="Trainee" control={<Radio />} label="Trainee" className='text-black' />
              </RadioGroup>
            </div>
          </div>
          <Button variant="contained" color="primary" className="mt-6" type="submit">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
