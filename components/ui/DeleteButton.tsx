import React from 'react';
import { Button } from '@mui/material';

interface DeleteButtonProps{
    handleDelete:()=>void;
    label:string
}

const DeleteButton = ({handleDelete, label}:DeleteButtonProps) => {

  return (
    <div className='mt-4'>
         <Button
            variant="outlined"
            color="error"
            style={{ color: '#F44336', borderColor: '#F44336' }}
            onClick={handleDelete}
        >
            {label}
        </Button>
    </div>
  )
}

export default DeleteButton