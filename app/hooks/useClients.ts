import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const useClients = (searchQuery: string) => {
  const router = useRouter();
  const [allClients, setAllClients] = useState<any[]>([]);
  const [filteredClients, setFilteredClients] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/customers');
      const data = await response.json();
      const formattedData = data.map((client: any) => ({
        id: client.id,
        name: client.name,
        email: client.email,
        contact: client.contact || '',
        type: client.type,
        tier: client.tier,
        contractType: client.contractType,
        paymentMethod: client.paymentMethod,
        addresses: client.clientaddress.map((addr: any) => addr.address).join(', '), 
      }));

      setAllClients(formattedData);
      setFilteredClients(formattedData); // Initially set both allClients and filteredClients
    } catch (error) {
      console.error('Error fetching clients:', error);
      Swal.fire({
        title: 'Error',
        text: 'There was an issue fetching clients.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
    finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients(); // Fetch clients on component mount
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredClients(
        allClients.filter(client =>
          client.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredClients(allClients); // If no search query, show all clients
    }
  }, [searchQuery, allClients]); // Re-run when searchQuery or allClients changes

  const handleDeleteClient = async () => {
    if (!selectedClientId) {
      Swal.fire('Error', 'Please select a client to delete', 'info');
      return;
    }

    Swal.fire({
      title: 'Are you sure you want to remove this client?',
      text: 'You will not be able to reverse this action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes',
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleting...',
          text: 'Please wait while removing the client',
          icon: 'info',
          showConfirmButton: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          // Delete client and associated addresses
          const response = await fetch(`/api/customers/${selectedClientId}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            throw new Error('Failed to delete client');
          }

          Swal.fire({
            title: 'Client Deleted',
            text: 'The client and associated addresses have been deleted successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            fetchClients(); // Refresh client list after deletion
            setSelectedClientId(null);
          });
        } catch (error) {
          console.error('Error deleting client:', error);
          Swal.fire({
            title: 'Error',
            text: 'There was an issue deleting the client.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  };

  return {
    allClients,
    filteredClients,
    selectedClientId,
    setSelectedClientId,
    fetchClients,
    handleDeleteClient,
    loading
  };
};

export default useClients;
