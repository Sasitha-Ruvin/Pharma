"use client"

import React, { useEffect, useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import useOrders from '@/app/hooks/useOrders';
import SideBar from '@/components/SideBar';
import SearchBar from '@/components/SearchBar';
import ActionButton from '@/components/ui/ActionButton';
import Swal from 'sweetalert2';
import DataGridTable from '@/components/DataGridTable';
import { CircularProgress } from '@mui/material';
import LoadingBackdrop from '@/components/ui/BackdropLoader';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'orderDate', headerName: 'Order Date', width: 150 },
  { field: 'clientName', headerName: 'Client Name', width: 150 },
  { field: 'clientEmail', headerName: 'Client Email', width: 200 },
  { field: 'clientContact', headerName: 'Client Contact', width: 150 },
  { field: 'userName', headerName: 'Employee Issued', width: 150 },
  {
    field: 'status',
    headerName: 'Order Status',
    width: 150,
    renderCell: (params) => {
      const status = params.value;
      const backgroundColor =
        status === 'Pending' ? 'yellow' :
        status === 'Shipped' ? 'lightblue' :
        status === 'On Delivery' ? 'skyblue' :
        status === 'Completed' ? 'lightgreen' :
        status === 'Cancelled' ? 'lightpink' : 'white';

      return (
        <div style={{ borderRadius: '8px', backgroundColor, textAlign:'center' }}>
          {status}
        </div>
      );
    },
  },
  { field: 'estDeliveryDate', headerName: 'Estimated Delivery Date', width:150},
  { field: 'deliveryAddress', headerName: 'Delivery Address', width: 250 },
  {
    field: 'medications',
    headerName: 'Medications',
    width: 300,
    renderCell: (params) =>
      params.row.medications
        .map((med: any) => `${med.scientificName} (Qty: ${med.quantity})`) 
        .join(', '),
  },
  { 
    field: 'total', 
    headerName: 'Total Price ($)', 
    width: 150,
    renderCell: (params) => `$${params.value.toFixed(2)}`,
  },
];


const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const{
    allOrders,
    filteredOrders,
    selectedOrderId,
    setSelectedOrderId,
    loading

  }=useOrders(searchQuery);

  const handleAddOrder = () =>{
    setIsNavigating(true);
    window.location.href = '/orders/create'
  }

  return (
    <div className='flex h-screen'>
      <SideBar/>
      <div className='bg-[#F7F8FA] flex-1 p-8'>
      <h2 className='text-2xl font-bold mb-2 text-black'>Manage Orders</h2>
      <p className='text-gray-500 mb-6'>Detailed View of Orders</p>

      <div className='flex justify-between items-center mb-4'>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <ActionButton label='New Order'onClick={handleAddOrder} color='primary' variant='contained' />
      </div>
      {loading ? (
        <div className='flex justify-center items-center h-[400px]'>
          <CircularProgress color='primary'/>
        </div>
      ):( 
        <div style={{height:400, width:'100%'}}>
          <DataGridTable
          rows={filteredOrders}
          columns={columns}
          onRowSelectionChange={setSelectedOrderId}
          />
        </div>
      )}


      <div className='mt-4 flex flex-row gap-5'>
        <div className='flex gap-4'>
          <ActionButton label='Update'
          onClick={() =>{
            if(!selectedOrderId){
              Swal.fire('Error',"Please Select an Order",'error');
              return;
            }
            window.location.href = `/orders/update/${selectedOrderId}`
          }}
          
          />
        </div>
      </div>
    </div>
    <LoadingBackdrop open={isNavigating}/>
  </div>
  )
}

export default page