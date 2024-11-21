"use client"

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SideBar from '@/components/SideBar';
import { roles } from '@/data/roles';
import useUsers from '@/app/hooks/useUsers';
import Forms from '@/components/Forms';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

const EmployeeForm = () => {
  const router = useRouter();
  const { handleAddEmployee } = useUsers('');



  const initialValues = {
    name: '',
    email: '',
    address: '',
    password: '',
    role: '',
    contact: '',
    dateJoined: '',
    status: '',
  };

  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'address', label: 'Address' },
    { name: 'password', label: 'Password'},
    { name: 'role', label: 'Role', options: roles },
    { name: 'contact', label: 'Contact' },
    { name: 'dateJoined', label: 'Date Joined', type: 'date' }, 
    { name: 'status', label: 'Status', options: [
        { value: 'Permanent', label: 'Permanent' },
        { value: 'Trainee', label: 'Trainee' },
      ]},
  ];

  const handleSubmit = (formData: Record<string, any>) => {
    console.log("Form Data Submitted:", formData); 
    handleAddEmployee(formData);
  };

  //login using checking using JWT token
  useEffect(() => {
    const token = Cookies.get('authToken');
    if (!token) {
      router.push('/login'); // Redirect to login if no token
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      const allowedRoles = ['Admin', 'HR Manager', 'Chief Operating Officer'];
      if (!allowedRoles.includes(decoded.role)) {
        router.push('/unauthorized'); // Redirect to an unauthorized page
      }
    } catch (error) {
      router.push('/login'); // Redirect if token is invalid
    }
  }, [router]);
  return (
    <div className="flex h-screen">
      <SideBar />
      <Forms
        title="Add Employee"
        fields={fields}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default EmployeeForm;
