'use client'

import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 
import Swal from 'sweetalert2';
import SideBar from '@/components/SideBar';



export const Products = () => {
  const router = useRouter();
  const [suppliers, setSuppliers] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    expiration: "",
    supplierId: "",
    quantity: "",
    storetemp: "",
    shelf: "",
    directions: "",
    description:"",
    sideEffect: "",
  });

  useEffect(() => {
    // Fetch suppliers from the database
    const fetchSuppliers = async () => {
      const response = await fetch('/api/suppliers'); 
      const data = await response.json();
      setSuppliers(data);
    };
    fetchSuppliers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value });
  };


  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      const response = await fetch('/api/products',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      if(response.ok){
        Swal.fire('Success','Product Added','success');
        router.push('/products/index');
      }else{
        Swal.fire('Error','Failed to Add Product','error');
      }
    }catch(error){
      console.error(error)
    }
  }
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar/>
      {/* Main Content */}
      <main className="w-3/4 p-8 bg-gray-50 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6 text-black">Add Products</h1>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Expiration Date"
            name="expiration"
            value={formData.expiration}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            variant="outlined"
            type="date" 
            fullWidth
          />
          <FormControl fullWidth variant="outlined">
            <InputLabel>Supplier</InputLabel>
            <Select
              name="supplierId"
              value={formData.supplierId}
              onChange={handleSelectChange}
              label="Supplier"
            >
              {suppliers.map(supplier => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Stored Temperature"
            name="storetemp"
            value={formData.storetemp}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Shelf Address"
            name="shelf"
            value={formData.shelf}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
          <div className="col-span-2">
            <TextField
              label="Directions to Use"
              name="directions"
              value={formData.directions}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
            />
          </div>
          <div className="col-span-2">
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
            />
          </div>
          <div className="col-span-2">
            <TextField
              label="Side Effects"
              name="sideEffect"
              value={formData.sideEffect}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              multiline
              rows={3}
            />
          </div>
          <div className="col-span-2 flex justify-start mt-4 text-lg">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Products;
