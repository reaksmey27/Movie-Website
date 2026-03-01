import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const useProfile = () => {
    const { user, logout } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) {
        navigate('/login');
        return { user: null };
    }

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        setIsEditing(false);
        showNotification('Profile settings updated successfully!', 'success');
    };

    return {
        user,
        logout,
        isEditing,
        setIsEditing,
        handleUpdateProfile,
    };
};

export default useProfile;
