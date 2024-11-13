"use client";

import React, { useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { Button, TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SideBar from "@/components/SideBar";
import AddButton from "@/components/ui/AddButton";
import DeleteButton from "@/components/ui/DeleteButton";
import useProducts from "@/app/hooks/useProducts";
import SearchBar from "@/components/SearchBar";
import DataGridTable from "@/components/DataGridTable";
import ActionButton from "@/components/ui/ActionButton";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 20 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "expiration", headerName: "Expiration", width: 70 },
  { field: "quantity", headerName: "Quantity", width: 100 },
  { field: "description", headerName: "Description", width: 100 },
  { field: "directions", headerName: "Direction", width: 100 },
  { field: "sideEffect", headerName: "Side Effects", width: 100 },
  { field: "supplierId", headerName: "Supplier ID", width: 100 },
  { field: "shelf", headerName: "Shelf", width: 100 },
  { field: "storetemp", headerName: "Store Temperature", width: 100 },
];

export const ProductForm = () => {

  const [searchQuery, setSearchQuery] = useState('');

  const [rows, setRows] = useState<GridRowsProp>([]);
  const router = useRouter();
  const [productId, setProductId] = useState<string | null>(null);
  
  const{
        allProducts,
        filteredProducts,
        selectedProductId,
        setSelectedProductId,
        handleDelete
      }= useProducts(searchQuery)
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
        <SideBar />
      {/* Main Content */}
      <div className="bg-[#F7F8FA] flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Manage Medications</h2>
        <div className="flex justify-between items-center mb-4">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <ActionButton label='Add Product' link='/products/create' variant='contained' color='primary'/>
        </div>

        <div style={{ height: 400, width: "100%" }}>
          <DataGridTable
            rows={filteredProducts}
            columns={columns}
            onRowSelectionChange={setSelectedProductId}
          />
        </div>

        <div className="mt-4">
        <ActionButton label='Remove Product' onClick={handleDelete} variant='outlined' color='error' />
        <ActionButton label='Update Product' link='/products/update' variant='contained' color='primary'/>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
