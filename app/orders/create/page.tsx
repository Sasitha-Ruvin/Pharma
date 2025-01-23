"use client"

import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Button, MenuItem, IconButton, TextField } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import SideBar from '@/components/SideBar';

interface Medication {
    id: number;
    name: string; 
    pricePerUnit: number;
  }

interface Client {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
}

interface OrderItem {
  medicationId: number;
  quantity: number;
  price: number;
}

const OrderForm = () => {
  const [medications, setMedication] = useState<Medication[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    { medicationId: 0, quantity: 1, price: 0 },
  ]);
  const [orderDate, setOrderDate] = useState<string>('');
  const [estDeliveryDate, setEstDeliveryDate] = useState<string>('');
  const [clients, setClients] = useState<Client[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [selectedClient, setSelectedClient] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {

    const fetchMedications = async () => {
      try {
        const response = await fetch('/api/products/medicationname');
        if (response.ok) {
          const data: Medication[] = await response.json();
          setMedication(data);
          console.log(data)
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch Medications.',
          });
        }
      } catch (error) {
        console.error('Error fetching medications:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Unexpected Error.',
        });
      }
    };
    fetchMedications();
  }, []);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch('/api/customers');
        if (response.ok) {
          const data: Client[] = await response.json();
          setClients(data);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch Clients.',
          });
        }
      } catch (error) {
        console.error('Error fetching clients:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred.',
        });
      }
    };
    fetchClient();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/salesemployee');
        if (response.ok) {
          const data: User[] = await response.json();
          setUsers(data);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch Users.',
          });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An unexpected error occurred.',
        });
      }
    };
    fetchUsers();
  }, []);

  const handleClientChange = (event: React.ChangeEvent<{ value: unknown }>, index: number) => {
    const selectedClientId = event.target.value as number;
    setSelectedClient(selectedClientId);
    console.log("Selected Client ID:", selectedClientId);
  };

  const handleUserChange = (event: React.ChangeEvent<{ value: unknown }>, index:number) => {
    const selectedUserID = event.target.value as number;
    setSelectedUser(selectedUserID);
    console.log("Selected User: ",selectedUserID)
  };

  const calculateTotalPrice = (items: OrderItem[]) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  const handleMedicationChange = (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = { ...updatedItems[index], [field]: value };

    // Auto-calculate the price based on quantity and selected medication
    if (field === 'medicationId') {
      const selectedMedication = medications.find(
        (med) => med.id === Number(value)
      );
      if (selectedMedication) {
        const quantity = Number(updatedItems[index].quantity) || 0;
        updatedItems[index].price = selectedMedication.pricePerUnit * quantity;
      }
    } else if (field === 'quantity') {
      const selectedMedication = medications.find(
        (med) => med.id === updatedItems[index].medicationId
      );
      if (selectedMedication) {
        const quantity = Number(value) || 0;
        updatedItems[index].price = selectedMedication.pricePerUnit * quantity;
      }
    }

    setOrderItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  const addMedication = () => {
    setOrderItems([...orderItems, { medicationId: 0, quantity: 1, price: 0 }]);
  };

  const removeMedication = (index: number) => {
    const updatedItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedItems);
    calculateTotalPrice(updatedItems);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!orderDate || !deliveryAddress || !estDeliveryDate || !selectedClient || !selectedUser || orderItems.length === 0 || !selectedClient || !selectedUser) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please Provide All the required Fields',
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('orderDate', orderDate);
      formData.append('estDeliveryDate', estDeliveryDate);
      formData.append('deliveryAddress', deliveryAddress);
      formData.append('notes', notes);
      formData.append('selectedClient', selectedClient?.toString() || '');
      formData.append('selectedUser', selectedUser?.toString() || '');
      formData.append('items', JSON.stringify(orderItems));
      formData.append('totalPrice', totalPrice.toString());
      console.log(estDeliveryDate, orderDate, notes,deliveryAddress, selectedClient, selectedUser, orderItems)

      const response = await fetch('/api/orders', {
          method: 'POST',
          body: formData,
      });

      if (response.ok) {
          Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Order created successfully!',
          });
      } else {
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to create order.',
          });
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred.',
      });
    }
  };

  return (
    <div className='flex h-screen'>
      <SideBar />
      <div className='bg-[#F7F8FA] flex-1 p-8 overflow-y-auto'>
        <h2 className='text-2xl font-bold mb-4 text-black'>Add Orders</h2>
        <form onSubmit={handleSubmit} className='w-full max-w-2xl space-y-6'>
          {orderItems.map((item, index) => (
            <div key={index} className='grid grid-cols-3 gap-4'>
              <TextField
                select
                label="Medication"
                value={item.medicationId}
                onChange={(e) => handleMedicationChange(index, 'medicationId', parseInt(e.target.value, 10))}
                variant='outlined'
              >
                <MenuItem value={0} disabled>
                  Select Product
                </MenuItem>
                {medications.length > 0 ? (
                  medications.map((medication) => (
                    <MenuItem key={medication.id} value={medication.id}>
                      {medication.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled>No Medications Available</MenuItem>
                )}
              </TextField>
              <TextField
                label="Quantity"
                type='number'
                value={item.quantity}
                onChange={(e) => handleMedicationChange(index, 'quantity', parseInt(e.target.value, 10))}
                variant='outlined'
              />
              <IconButton color='error' onClick={() => removeMedication(index)}>
                <Delete />
              </IconButton>
            </div>
          ))}
          <Button variant='outlined' color='primary' startIcon={<Add />} onClick={addMedication}>
            Add More
          </Button>
          {clients.length > 0  && (
            <div className='grid grid-cols-1'>
            <TextField
             select
             label="Client"
             value={selectedClient ?? ''}
             onChange={(e)=>handleClientChange(e, 0)}
             fullWidth
            >
            {clients.length > 0 ? (
                clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                    {client.name}
                </MenuItem>
                ))
            ) : (
                <MenuItem disabled>No Clients Available</MenuItem>
            )}
            </TextField>
        </div>
          )}
          {users.length > 0 && (
            <div className='grid grid-cols-1'>
                <TextField
                select
                label="Employee"
                value={selectedUser ?? ''} 
                onChange={(e) => handleUserChange(e,0)} 
                fullWidth
                >
                {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                    {user.name}
                    </MenuItem>
                ))}
                </TextField>
            </div>
            )}
          <TextField
          label = "Order Date"
          type='date'
          value={orderDate}
          onChange={(e)=> setOrderDate(e.target.value)}
          variant='outlined'
          fullWidth
          InputLabelProps={{
            shrink:true,
          }}
          />
          <TextField
          label="Estimated Arrival Date"
          type='date'
          value={estDeliveryDate}
          onChange={(e) => setEstDeliveryDate(e.target.value)}
          variant='outlined'
          fullWidth
          InputLabelProps={{
            shrink:true
          }}
          />
          <TextField
          label="Delivery Address"
          value={deliveryAddress}
          onChange={(e)=>setDeliveryAddress(e.target.value)}
          variant='outlined'
          fullWidth
          />
          <TextField
          label="Notes"
          value={notes}
          onChange={(e)=>setNotes(e.target.value)}
          multiline
          rows={4}
          variant='outlined'
          fullWidth
          />
          <Button type='submit' color='primary' variant='contained'>Submit</Button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
