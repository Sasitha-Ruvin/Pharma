import React, { useState } from 'react';
import { Button, IconButton, CircularProgress } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'

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
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePrefetchAndNavigate = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!link) return;
        e.preventDefault();
        setLoading(true);

        try {
            // Prefetch the link to improve navigation performance
            await router.prefetch(link);
            // Navigate to the link after ensuring it's preloaded
            router.push(link);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        Cookies.remove('authToken');
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
        <Button
            variant={variant}
            style={buttonStyle}
            disabled={loading}
            onClick={(e) => handlePrefetchAndNavigate(e)}
        >
            {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : label}
        </Button>
    ) : (
        <Button variant={variant} style={buttonStyle} onClick={onClick} disabled={loading}>
            {label}
        </Button>
    );
};

export default ActionButton;
