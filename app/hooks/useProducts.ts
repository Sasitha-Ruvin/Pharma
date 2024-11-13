import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const useProducts = (searchQuery:string)=>{
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
          const response = await fetch("/api/products");
          const data = await response.json();
    
          const formattedData = data.products.map((product: any) => ({
            id: product.id,
            name: product.name,
            expiration: product.expiration,
            quantity: product.quantity,
            storetemp: product.storetemp,
            shelf: product.shelf,
            description: product.description,
            directions: product.directions, 
            sideEffect: product.sideEffect,
            supplierId: product.supplierId,
          }));
      
          setAllProducts(formattedData);
          setFilteredProducts(formattedData);
        } catch (error) {
          console.error("Error Fetching Products", error);
        }
      };

    //   Search Query
    useEffect(()=>{
        if(searchQuery.trim()===''){
            setFilteredProducts(allProducts)
        }else{
            setFilteredProducts(
                allProducts.filter(product=>
                    product.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
                )
            );
        }
    },[searchQuery,allProducts]);

    useEffect(()=>{
        fetchProducts();
    },[]);

    const handleDelete = async () => {
        if (!selectedProductId) {
          Swal.fire("Error", "Select a Product to Remove", "info");
          return;
        }
    
        // confirmation box
        Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to recover this product!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            try {
           
              await fetch(`/api/products/${selectedProductId}`, {
                method: "DELETE",
              });
    
              Swal.fire({
                title: "Product Deleted",
                text: "The Product has been deleted successfully.",
                icon: "success",
                confirmButtonText: "OK",
              }).then(() => {
                fetchProducts();
                setSelectedProductId(null);
              });
            } catch (error) {
              console.error("Error Deleting Product:", error);
              Swal.fire({
                title: "Error",
                text: "There was an issue deleting the product.",
                icon: "error",
                confirmButtonText: "OK",
              });
            }
          }
        });
      };

      return{
        allProducts,
        filteredProducts,
        selectedProductId,
        setSelectedProductId,
        handleDelete
      }

}

export default useProducts;