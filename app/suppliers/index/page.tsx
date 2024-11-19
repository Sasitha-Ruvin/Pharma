"use client"

import React, { useEffect, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import SideBar from '@/components/SideBar';
import useSuppliers from '@/app/hooks/useSuppliers';
import DataGridTable from '@/components/DataGridTable';
import SearchBar from '@/components/SearchBar';

import ActionButton from '@/components/ui/ActionButton';
import Swal from 'sweetalert2';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'contact', headerName: 'Contact', width: 150 },
  { field: 'email', headerName: 'Email', width: 150 },
  { field: 'country', headerName: 'Country', width: 150 },
  { field: 'tier', headerName: 'Tier', width: 150 },
  { field: 'address', headerName: 'Address', width: 150 },
];

const page = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const{
    allUsers,
    filteredSuppliers,
    selectedSupplierId,
    setSelectedSupplierId,
    handleDelete
  }= useSuppliers(searchQuery)


  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <SideBar/>

    {/* Main Content */}
    <div className="bg-[#F7F8FA] flex-1 p-8">
      {/* Header */}
      <h2 className="text-2xl font-bold mb-2 text-black">Manage Suppliers</h2>
      <p className="text-gray-500 mb-6">Detailed view of Suppliers</p>

      {/* Search and Add Employee */}
      <div className="flex justify-between items-center mb-4">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <ActionButton label='Add Supplier' link='/suppliers/create' variant='contained' color='primary'/>
      </div>

      {/* DataGrid */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGridTable
          rows={filteredSuppliers}
          columns={columns}
          onRowSelectionChange={setSelectedSupplierId}
         />
      </div>

      {/* Delete Button */}
      <div className="mt-4">
        <div className='flex gap-4'>
        <ActionButton label='Remove Supplier' onClick={handleDelete} variant='outlined' color='error' />
        <ActionButton label='Update Supplier' 
        onClick={() =>{
          if(!selectedSupplierId){
            Swal.fire("Error","Please Select a Supplier ID");
            return;
          }
          window.location.href = `/suppliers/update/${selectedSupplierId}`;
        }} 
        variant='contained' 
        color='primary'/>
        </div>
     
      </div>
    </div>
  </div>
  )
}

export default page