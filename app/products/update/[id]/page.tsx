"use client";

import React, { useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2';
import SideBar from '@/components/SideBar';

const page = () => {
    const router = useRouter();
    const params = useParams();

    const [formData, setFormData] = useState({
        scientificName: '',
        amount: '',
        pricePerUnit: '',
        shelfAddress: '',
    });
    const [isClient, setIsClient] = useState(false);

    // Fetch the current medication details
    const fetchProduct = async () => {
        try {
            const response = await fetch(`/api/products/${params.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch Product');
            }
            const product = await response.json();
            setFormData({
                scientificName: product.scientificName || '',
                amount: product.amount?.toString() || '0',
                pricePerUnit: product.pricePerUnit?.toString() || '0',
                shelfAddress: product.shelfAddress || '',
            });
        } catch (error) {
            console.error('Error Fetching Medication:', error);
            Swal.fire('Error', 'Failed to fetch Medication data', 'error');
        }
    };

    useEffect(() => {
        setIsClient(true); // Ensure hydration
        if (params.id) {
            fetchProduct();
        }
    }, [params?.id]);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const updatedFormData = {
                ...formData,
                amount: parseInt(formData.amount, 10), // Ensure `amount` is a number
                pricePerUnit: parseFloat(formData.pricePerUnit), // Ensure `pricePerUnit` is a number
            };

            const response = await fetch(`/api/products/${params.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedFormData),
            });

            if (!response.ok) {
                throw new Error('Failed to Update Product');
            }

            Swal.fire('Success', 'Product Updated Successfully', 'success').then(() => {
                router.push('/products/index');
            });
        } catch (error) {
            console.error('Error Updating Product:', error);
            Swal.fire('Error', 'Failed to Update Product', 'error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className='flex h-screen'>
            <SideBar />
            <div className='bg-[#F7F8FA] flex-1 p-8'>
                <h2 className='text-2xl font-bold mb-4 text-black'>Edit Product</h2>
                {isClient ? (
                    <form onSubmit={handleUpdate}>
                        <div className='grid grid-cols-2 gap-4'>
                            <TextField
                                label="Scientific Name"
                                fullWidth
                                variant="outlined"
                                name="scientificName"
                                onChange={handleChange}
                                value={formData.scientificName}
                            />
                            <TextField
                                label="Quantity"
                                name="amount"
                                variant="outlined"
                                onChange={handleChange}
                                value={formData.amount}
                            />
                            <TextField
                                label="Unit Price"
                                name="pricePerUnit"
                                onChange={handleChange}
                                value={formData.pricePerUnit}
                            />
                            <TextField
                                label="Shelf Address"
                                name="shelfAddress"
                                onChange={handleChange}
                                value={formData.shelfAddress}
                            />
                        </div>
                        <Button
                            variant="contained"
                            color="primary"
                            className="mt-10"
                            type="submit"
                            style={{ marginTop: '2rem' }}
                        >
                            Update
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
