import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const useSuppliers = (searchQuery:string)=>{
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [filteredSuppliers, setFilteredSuppliers] = useState<any[]>([]);
    const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>(null);

    const fetchSuppliers = async () => {
        try {
            const response = await fetch('/api/suppliers');
            const data = await response.json();
            const formattedData = data.map((supplier:any)=>({
                id:supplier.id,
                name:supplier.name,
                address:supplier.address,
                contact:supplier.contact,
                email:supplier.email,
                country:supplier.country,
                tier:supplier.tier
            }));
            setAllUsers(formattedData);
            setFilteredSuppliers(formattedData);
            
        } catch (error) {
            console.error("Error Fetching Suppliers",error)
            
        }
    };

    // Search Query
    useEffect(()=>{
        if(searchQuery.trim()=== ''){
            setFilteredSuppliers(allUsers);
        }else{
            setFilteredSuppliers(
                allUsers.filter(supplier=>
                    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    supplier.email.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    },[searchQuery,allUsers]);

    // Fetch suppliers when component mounts
    useEffect(()=>{
        fetchSuppliers();
    },[]);

    const handleDelete = async () =>{
        if(!selectedSupplierId){
            Swal.fire("Error","Select a Supplier to Remove",'info')
            return;
        }

        Swal.fire({
          title:"Are you sure you want to remove Supplier",
          text:"You will not be able to reverse this Action",
          icon:"warning",
          showCancelButton:true,
          confirmButtonColor:'#d33',
          cancelButtonColor:"#3085d6",
          confirmButtonText:"Yes",
        }).then(async(result)=>{
          if(result.isConfirmed){
            try {
              await fetch(`/api/suppliers/${selectedSupplierId}`,{
                  method:'DELETE',
              });
  
              Swal.fire({
                  title:'Supplier Removed',
                  text:'The Supplier has been deleted Successfully',
                  icon:'success',
                  confirmButtonText:'OK',
              }).then(()=>{
                  fetchSuppliers();
                  setSelectedSupplierId(null);
              });
  
              
          } catch (error) {
              console.error('Error Deleting Supplier',error);
              Swal.fire({
                  title:'Error',
                  text:'There was an issue when deleting Supplier',
                  icon:'error',
                  confirmButtonText:'OK',
              });
              
          }
          }
        })      
    };

    return{
        allUsers,
        filteredSuppliers,
        selectedSupplierId,
        setSelectedSupplierId,
        handleDelete
    }
}

export default useSuppliers

