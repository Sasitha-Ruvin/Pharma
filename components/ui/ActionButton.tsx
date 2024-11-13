import React from 'react';
import { Button, IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ActionButtonProps {
    label?: string;
    link?: string;
    onClick?: () => void;
    variant?: 'contained' | 'outlined';
    color?: 'primary' | 'error';
    isLogout?: boolean;
}

const ActionButton = ({
    label,
    link,
    onClick,
    variant = 'contained',
    color = 'primary',
    isLogout = false,
}: ActionButtonProps) => {
    const router = useRouter();

    // Handle the logout process if isLogout is true
    const handleLogout = () => {
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('name'); // Clear other session details if needed
        router.push('/login');
    };

    const buttonStyle =
        color === 'error' && variant === 'outlined'
            ? { color: '#F44336', borderColor: '#F44336' }
            : color === 'primary' && variant === 'contained'
            ? { backgroundColor: '#1976D2', color: 'white' }
            : {};

    return isLogout ? (
        <IconButton onClick={handleLogout} style={{ color: 'white' }}>
            <ExitToAppIcon fontSize="large" />
        </IconButton>
    ) : link ? (
        <Link href={link}>
            <Button variant={variant} style={buttonStyle}>
                {label}
            </Button>
        </Link>
    ) : (
        <Button variant={variant} style={buttonStyle} onClick={onClick}>
            {label}
        </Button>
    );
};

export default ActionButton;
