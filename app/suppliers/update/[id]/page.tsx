"use client";
import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import Select from 'react-select';
import { useRouter, useParams } from 'next/navigation';
import countries from 'world-countries';
import Swal from 'sweetalert2';
import SideBar from '@/components/SideBar';

const page = () => {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    email: '',
    country: '',
    tier: '',
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (params?.id) {
      fetchSupplier(); // Fetch supplier details when the page loads
    }
  }, [params?.id]);

  const fetchSupplier = async () => {
    try {
      const response = await fetch(`/api/suppliers/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch supplier');
      }
      const supplier = await response.json();
      setFormData({
        name: supplier.name || '',
        address: supplier.address || '',
        contact: supplier.contact || '',
        email: supplier.email || '',
        country: supplier.country || '',
        tier: supplier.tier || '',
      });
    } catch (error) {
      console.error('Error fetching supplier:', error);
      Swal.fire('Error', 'Failed to fetch supplier data.', 'error');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/suppliers/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to update supplier');
      Swal.fire('Success', 'Supplier updated successfully', 'success').then(() =>
        router.push('/suppliers/index')
      );
    } catch (error) {
      console.error('Error updating supplier:', error);
      Swal.fire('Error', 'Failed to update supplier.', 'error');
    }
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

  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
  }));

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

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="bg-[#F7F8FA] flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Edit Supplier</h2>
        {isClient ? (
          <form onSubmit={handleUpdate}>
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
                value={countryOptions.find((option) => option.label === formData.country)}
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
            <Button
              variant="contained"
              color="primary"
              className="mt-10"
              type="submit"
              style={{ marginTop: '2rem' }} // Additional inline style fallback
            >
              Save
            </Button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default page;
