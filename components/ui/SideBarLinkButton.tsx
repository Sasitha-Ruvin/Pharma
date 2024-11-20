"use client"

import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';

interface SideBarLinkButtonProps {
    href:string;
    label:string;
}

const SideBarLinkButton = ({href, label}:SideBarLinkButtonProps) => {
  return (
    <Link href={href}>
        <Button className='flex items-center p-2 text-lg text-white hover:bg-blue-400 cursor-pointer'>
            {label}
        </Button>

    </Link>
  )
}

export default SideBarLinkButton