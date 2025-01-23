'use client';

import React, { useEffect, useState } from 'react';
import { TextField, Button, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import SideBar from '@/components/SideBar';
import CustomTextField from '@/components/ui/CustomTextField';
import { roles as baseRoles } from '@/data/roles';
import useUsers from '@/app/hooks/useUsers';
import { isValidEmail, isValidContact } from '../../../utils/formValidations';

const EmployeeForm = () => {
  const router = useRouter();
  const { handleAddEmployee } = useUsers('');
  const [isLoading, setIsLoading] = useState(true);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [availableRoles, setAvailableRoles] = useState(baseRoles); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    password: '',
    role: '',
    contact: '',
    dateJoined: '',
    status: '',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (!token) {
      router.push('/login'); 
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const allowedRoles = ['Admin', 'HR Manager', 'Chief Operating Officer'];
      if (!allowedRoles.includes(decoded.role)) {
        router.push('/unauthorized'); // Redirect to an unauthorized page
        return;
      }

      // Add extra roles for Admin
      if (decoded.role === 'Admin') {
        setAvailableRoles([
          ...baseRoles,
          { value: 'Chief Operating Officer', label: 'Chief Operating Officer' },
          { value: 'HR Manager', label: 'HR Manager' },
        ]);
      }
    } catch (error) {
      router.push('/login'); 
    }
  }, [router]);

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
    const { name, value } = e.target;
    // Update form state
    setFormData({
      ...formData,
      [name]: value,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!isValidEmail(formData.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        text: 'Please enter a valid email address.',
      });
      return;
    }
    else if (!isValidContact(formData.contact)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Contact',
        text: 'Please enter a valid 10-digit contact number.',
      });
      return;
    }
    else{
      handleAddEmployee(formData);

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

  if (!isMounted) return null;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />
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
              variant="outlined"
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
              options={availableRoles} // Use dynamic roles
              onChange={handleRoleChange}
              placeholder="Select Role"
              className="w-full"
              value={availableRoles.find((role) => role.value === formData.role)}
              styles={customSelectStyles}
              id="role-select"
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
                <FormControlLabel value="Permanent" control={<Radio />} label="Permanent" className="text-black" />
                <FormControlLabel value="Trainee" control={<Radio />} label="Trainee" className="text-black" />
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
