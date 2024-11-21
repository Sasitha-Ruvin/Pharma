
'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '../app/globals.css';
import '@mui/material/styles';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redirect to the login page
  }, [router]);

  return null; // Render nothing while redirecting
}