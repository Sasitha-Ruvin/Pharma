import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingBackdropProps {
  open: boolean;
}

const LoadingBackdrop: React.FC<LoadingBackdropProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingBackdrop;
