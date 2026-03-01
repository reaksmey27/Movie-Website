import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Shared auth form hook for Login and Signup pages.
 * @param {'login' | 'signup'} mode - determines which auth flow to use
 */
const useAuthForm = (mode = 'login') => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            if (mode === 'login') {
                login({ email, name: email.split('@')[0] });
            } else {
                login({ email, name });
            }
            setLoading(false);
            navigate('/');
        }, 1500);
    };

    return {
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        loading,
        handleSubmit,
    };
};

export default useAuthForm;
