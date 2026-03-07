import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const useProfile = () => {
    const { user, logout } = useAuth();
    const { showNotification } = useNotification();
    const [isEditing, setIsEditing] = useState(false);

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
