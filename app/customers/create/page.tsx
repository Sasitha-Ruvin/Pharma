'use client';
import SideBar from '@/components/SideBar';
import CustomTextField from '@/components/ui/CustomTextField';
import { Button,TextField,CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Swal from 'sweetalert2';

const ClientForm = () => {

    const router = useRouter();
    const [formData, setFormData]=useState({
        name:'',
        type:'',
        email:'',
        contact:'',
        contractType:'',
        paymentMethod:'',
        tier:'',
        addresses:[''],
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormData({...formData,[name]:value});
    }

    const handleAddressChange = (index:number, value:string)=>{
        const updatedAddress = [...formData.addresses];
        updatedAddress[index]=value;
        setFormData({...formData,addresses:updatedAddress});
    };

    const addAddress = ()=>{
        setFormData({...formData, addresses:[...formData.addresses, '']});
    };

    const removeAddress = (index:number)=>{
        const updatedAddresses = formData.addresses.filter((_,i)=> i !==index);
        setFormData({...formData, addresses:updatedAddresses});
    }

    const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault();
        try{
            const response = await fetch('/api/customers',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData),
            });

            if(!response.ok){
                const { error } = await response.json();
                Swal.fire({
                    icon:'error',
                    title:'Error',
                    text:error,

                });
                return;
            }

            Swal.fire({
                icon:'success',
                title:'Success',
                text:"Client Added Successfullly"
            });
            router.push('/customers/index')
        }catch(error){
            console.log("Error Adding Clients: ",error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add client',
              });
        }
    }
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar />

      {/* Main Content */}
      <div className="bg-[#F7F8FA] flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Add Client</h2>
        {isLoading? (
          <div className='flex justify-center items-center h-full'>
            <CircularProgress/>
          </div>

        ):(
          <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <CustomTextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Contract Type"
              name="contractType"
              value={formData.contractType}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Payment Method"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              variant="outlined"
            />
            <CustomTextField
              label="Tier"
              name="tier"
              value={formData.tier}
              onChange={handleChange}
              variant="outlined"
            />
            <div className="col-span-2">
              <h4 className="font-semibold text-lg mb-2 text-black">Addresses</h4>
              {formData.addresses.map((address, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <TextField
                    name={`address[${index+1}]`}
                    label={`Address ${index + 1}`}
                    value={address}
                    onChange={(e) => handleAddressChange(index, e.target.value)}
                    fullWidth
                  />
                  <Button variant="outlined" color="secondary" onClick={() => removeAddress(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outlined" onClick={addAddress}>
                Add Address
              </Button>
            </div>
          </div>
          <Button id="save-client-button" variant="contained" color="primary" className="mt-6" type="submit">
            Save Client
          </Button>
        </form>    
        )}
      </div>
    </div>
  )
}

export default ClientForm