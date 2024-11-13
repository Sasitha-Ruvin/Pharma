'use client'
import React from 'react';
import { IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/navigation';


const LogOutButton = () => {
    const router = useRouter();

    const handleLogout = ()=>{
        sessionStorage.removeItem('role');
        router.push('/login');
    }
  return (
    <IconButton onClick={handleLogout} className='text-white'>
        <ExitToAppIcon fontSize='large'/>
    </IconButton>
   
  )
}

export default LogOutButton