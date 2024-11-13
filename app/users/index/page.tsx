'use client';

import React, { useEffect, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import SideBar from '@/components/SideBar';
import DataGridTable from '@/components/DataGridTable';
import AddButton from '@/components/ui/AddButton';
import DeleteButton from '@/components/ui/DeleteButton';
import SearchBar from '@/components/SearchBar';
import useUsers from '@/app/hooks/useUsers';
import UpdateButton from '@/components/ui/UpdateButton';
import ActionButton from '@/components/ui/ActionButton';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'contact', headerName: 'Contact', width: 150 },
  { field: 'address', headerName: 'Address', width: 150 },
  { field: 'email', headerName: 'E-mail', width: 150 },
  { field: 'role', headerName: 'Role', width: 150 },
  { field: 'status', headerName: 'Status', width: 50 },
  { field: 'dateJoined', headerName: 'Date Joined', width: 150 },
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const {
    allUsers,
    filteredUsers,
    selectedUserId,
    setSelectedUserId,
    handleDelete
  } = useUsers(searchQuery);

  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar/>

      {/* Main Content */}
      <div className="bg-[#F7F8FA] flex-1 p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-2 text-black">Manage Employees</h2>
        <p className="text-gray-500 mb-6">Detailed view of Employees</p>

        {/* Search and Add Employee */}
        <div className="flex justify-between items-center mb-4">
          
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>

          <ActionButton label='Add Employee' link='/users/create' color='primary' variant='contained' />
        </div>

        {/* DataGrid */}
        <div style={{ height: 400, width: '100%' }}>
          <DataGridTable 
            rows={filteredUsers}
            columns={columns}
            onRowSelectionChange={setSelectedUserId}
          />
        </div>

        <div className="mt-4 flex flex-row gap-5">
          <ActionButton label='Remove Employee' onClick={handleDelete} variant='outlined' color='error' />
          <ActionButton label='Update Employee' link='/users/update' variant='contained' color='primary'/>
        </div>
      </div>
    </div>
  );
};

export default Page;
