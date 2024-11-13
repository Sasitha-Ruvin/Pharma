import React from 'react'
import { Button } from '@mui/material';
import Link from 'next/link';

interface UpdateButtonProps{
    label:string,
    link:string,
}

const UpdateButton = ({label, link}:UpdateButtonProps) => {
  return (
    <div className='mt-4'>
        <Link href={link}>
            <Button variant='contained' color='primary' style={{backgroundColor:'#1976D2'}}>
                {label}
            </Button>
         </Link>
    </div>
    
  )
}

export default UpdateButton