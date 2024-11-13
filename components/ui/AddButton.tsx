import React from 'react'
import { Button } from '@mui/material';
import Link from 'next/link';

interface AddButtonProps {
    label:string;
    link:string;
}

const AddButton = ({label, link}:AddButtonProps) => {
  return (
    <Link href={link}>
        <Button variant='contained' color='error' style={{backgroundColor:'#F44336'}}>
            {label}
        </Button>
    </Link>
  )
}

export default AddButton