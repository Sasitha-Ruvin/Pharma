"use client";

import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Backdrop } from "@mui/material";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import SideBar from "@/components/SideBar";
import SearchBar from "@/components/SearchBar";
import DataGridTable from "@/components/DataGridTable";
import ActionButton from "@/components/ui/ActionButton";
import useMedications from "@/app/hooks/useMedication";
import LoadingBackdrop from "@/components/ui/BackdropLoader";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "medicationname", headerName: "Name", width: 200 },
  { field: "scientificName", headerName:"Scientific Name", width:200},
  { field: "batchcode", headerName: "Batch Code", width: 200 },
  { field: "expiration", headerName: "Expiration", width: 200 },
  { field: "arrival", headerName: "Arrival", width: 200 },
  { field: "quantity", headerName: "Quantity", width: 200 },
  { field: "directions", headerName: "Instructions", width: 400 },
  { field: "ingredients", headerName: "ingredients", width: 200 },
  { field: "warning", headerName: "Warnings", width: 200 },
  { field: "price", headerName: "Price Per Unit", width: 200 },
  { field: "sideEffect", headerName: "Side Effects", width: 200 },
  { field: "shelf", headerName: "Shelf", width: 100 },
  { field: "storetemp", headerName: "Store Temperature", width: 100 },
];


export const ProductForm = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleNavigation = () =>{
    setIsNavigating(true);
    window.location.href = '/products/create'
  }
  
  const{
    allMedications,
    filteredMedications,
    selectedMedicationId,
    setSelectedMedicationId,
    handleDelete,
    loading
    }= useMedications(searchQuery)
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
        <SideBar />
      {/* Main Content */}
      <div className="bg-[#F7F8FA] flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Manage Medications</h2>
        <div className="flex justify-between items-center mb-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="flex gap-4">
            <ActionButton label='Add Product' onClick={handleNavigation} variant='contained' color='primary'/>
            <ActionButton label="Add Medication Name" link="/medications/create" variant="contained" color="primary"/>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <CircularProgress color="primary"/>
          </div>
          
        ):(
          <div style={{ height: 400, width: "100%",}}>
          <DataGridTable
            rows={filteredMedications}
            columns={columns}
            onRowSelectionChange={setSelectedMedicationId}
          />
        </div>
        )}
        <div className="mt-4">
          <div className="flex gap-4">
            <ActionButton label='Remove Product' onClick={handleDelete} variant='outlined' color='error' />
            <ActionButton 
            label='Update Product' 
            variant='contained' 
            color='primary'
            onClick={() =>{
              if(!selectedMedicationId){
                Swal.fire("Error", "Please Selecet a Product to Update");
                return;
              }
              window.location.href = `/products/update/${selectedMedicationId}`
            }}/>
          </div>
        </div>
      </div>
      <LoadingBackdrop open={isNavigating}/>
    </div>
  );
};

export default ProductForm;
