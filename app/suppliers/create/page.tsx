'use client';

import React, { useState } from 'react';
import { TextField, Button} from '@mui/material';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { useRouter } from 'next/navigation';
import countries from 'world-countries';
import SideBar from '@/components/SideBar';

const initialFormData = {
    name: '',
    address: '',
    contact: '',
    email: '',
    country: '',
    tier: '',
};

const SupplierForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState(initialFormData);
    const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

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

    const handleCountryChange = (selectedOption: any) => {
        setFormData({
            ...formData,
            country: selectedOption.label,
        });
    };

    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/suppliers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                Swal.fire({
                    title: 'Supplier Added',
                    text: 'Supplier Added Successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
             
                setFormData(initialFormData);
            } else {
                Swal.fire({
                    title: "Error",
                    text: 'Failed to Add Supplier',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        } catch (error) {
            console.error('Error Saving Supplier', error);
        }
    };

    const countryOptions = countries.map((country) => ({
        value: country.cca2,
        label: country.name.common,
    }));



    

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <SideBar/>

            {/* Main Content */}
            <div className="bg-[#F7F8FA] flex-1 p-8">
                <h2 className="text-2xl font-bold mb-4 text-black">Add Supplier</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <TextField
                            label="Name"
                            fullWidth
                            variant="outlined"
                            name="name"
                            onChange={handleChange}
                            value={formData.name}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <TextField
                            label="Address"
                            fullWidth
                            variant="outlined"
                            name="address"
                            onChange={handleChange}
                            value={formData.address}
                        />
                        <TextField
                            label="Contact"
                            fullWidth
                            variant="outlined"
                            name="contact"
                            onChange={handleChange}
                            value={formData.contact}
                        />

                        <Select
                            options={countryOptions}
                            onChange={handleCountryChange}
                            placeholder="Country of Origin"
                            className="w-full"
                            name="country"
                            styles={customSelectStyles}
                        />
                        <TextField
                            label="Tier"
                            fullWidth
                            variant="outlined"
                            name="tier"
                            onChange={handleChange}
                            value={formData.tier}
                        />
                    </div>
                    <Button variant="contained" color="primary" className="mt-10" type="submit">
                        Save
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default SupplierForm;
