'use client';

import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { useRouter, useParams } from 'next/navigation';
import SideBar from '@/components/SideBar';
import CustomTextField from '@/components/ui/CustomTextField';
import { roles } from '@/data/roles';

type FormDataKeys = 'name' | 'email' | 'role' | 'address' | 'contact' | 'status' | 'dateJoined';

const EditUserPage = () => {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    role: '',
    contact: '',
    dateJoined: '',
    status: '',
  });
  const [isClient, setIsClient] = useState(false); // Add a state to check if it's client-side

  useEffect(() => {
    setIsClient(true); // Set to true once the component is mounted on the client side
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}`);
      const user = await response.json();
      setFormData({
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        contact: user.contact,
        dateJoined: user.dateJoined ? user.dateJoined.split('T')[0] : '',
        status: user.status,
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      Swal.fire('Error', 'Failed to fetch user data.', 'error');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update user');
      Swal.fire('Success', 'User updated successfully.', 'success').then(() =>
        router.push('/users/index')
      );
    } catch (error) {
      console.error('Error updating user:', error);
      Swal.fire('Error', 'Failed to update user.', 'error');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };

  const handleRoleChange = (selectedOption: any) => {
    setFormData({
      ...formData,
      role: selectedOption.value,
    });
  };

  const customSelectStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: '56px',
      fontSize: '16px',
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

  if (!isClient) return null; // Prevent rendering of the Select component on the server side

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="bg-[#F7F8FA] flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Edit Employee</h2>
        <form onSubmit={handleUpdate}>
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
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
            />
            <Select
              options={roles}
              onChange={handleRoleChange}
              placeholder="Select Role"
              value={roles.find((role) => role.value === formData.role)}
              styles={customSelectStyles}
              className="w-full"
            />
            <CustomTextField
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              label="Date Joined"
              name="dateJoined"
              type="date"
              value={formData.dateJoined}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className="mt-4">
            <FormLabel>Employee Status</FormLabel>
            <RadioGroup
              row
              name="status"
              value={formData.status}
              onChange={handleStatusChange}
            >
              <FormControlLabel value="Permanent" control={<Radio />} label="Permanent" className='text-black' />
              <FormControlLabel value="Trainee" control={<Radio />} label="Trainee" className='text-black' />
            </RadioGroup>
          </div>
          <Button type="submit" variant="contained" color="primary" className="mt-6">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;
