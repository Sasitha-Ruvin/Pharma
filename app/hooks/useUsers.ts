//app/hooks/useUsers.ts

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const useUsers = (searchQuery:string)=>{
    const router = useRouter();
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
          const response = await fetch('/api/users');
          const data = await response.json();
          const formattedData = data.map((user: any) => ({
            id: user.id,
            name: user.name,
            contact: user.contact || '',
            address: user.address,
            email: user.email,
            role: user.role,
            dateJoined: user.dateJoined ? new Date(user.dateJoined).toLocaleDateString() : '',
            status:user.status,
          }));
          setAllUsers(formattedData);
          setFilteredUsers(formattedData);
        } catch (error) {
          console.error("Error fetching users:", error);
          Swal.fire({
            title: 'Error',
            text: 'There was an issue fetching users.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      };

      // Adding Employees

      const handleAddEmployee = async (formData: any) => {
        if (!Object.values(formData).every(field => field)) {
          Swal.fire('Error', 'Please fill all fields.', 'error');
          return;
        }
    
        try {
          const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          const result = await response.json();
          if (response.ok) {
            Swal.fire({
              title: 'Employee Added',
              text: 'Employee Added Successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            });
    
            router.push('/users/index');
          } else {
            Swal.fire('Error', result.error || 'Failed to Add Employee', 'error');
          }
        } catch (error) {
          console.error('Error Saving Employee', error);
          Swal.fire('Error', 'Error Saving Employee', 'error');
        }
      };
    
    
      // Handle search query filtering
      useEffect(() => {
        if (searchQuery.trim() === '') {
          setFilteredUsers(allUsers);
        } else {
          setFilteredUsers(
            allUsers.filter(user =>
              user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              user.email.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        }
      }, [searchQuery, allUsers]);
    
      // Fetch users when component mounts
      useEffect(() => {
        fetchUsers();
      }, []);

  

  // Handle delete
  const handleDelete = async () => {
    if (!selectedUserId) {
      Swal.fire('Error', 'Please select a user to delete', 'info');
      return;
    }

    Swal.fire({
      title: "Are you sure you want to remove this employee?",
      text: "You will not be able to reverse this action",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: "#3085d6",
      confirmButtonText: 'Yes'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`/api/users/${selectedUserId}`, {
            method: 'DELETE',
          });
  
          Swal.fire({
            title: 'User Deleted',
            text: 'The user has been deleted successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
            fetchUsers(); // Refresh user list after deletion
            setSelectedUserId(null);
          });
  
        } catch (error) {
          console.error('Error deleting user:', error);
          Swal.fire({
            title: 'Error',
            text: 'There was an issue deleting the user.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  };



  return {
    allUsers,
    filteredUsers,
    selectedUserId,
    setSelectedUserId,
    handleAddEmployee,
    handleDelete,
  
  };
};

export default useUsers;

