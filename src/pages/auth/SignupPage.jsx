import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { EnvelopeIcon, LockClosedIcon, UserIcon, FilmIcon } from '@heroicons/react/24/outline';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            login({ email, name });
            setLoading(false);
            navigate('/');
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />

            <div className="w-full max-w-md animate-in fade-in zoom-in duration-700">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-10 shadow-2xl">
                    <div className="flex flex-col items-center mb-10">
                        <div className="bg-blue-600 p-4 rounded-2xl shadow-xl shadow-blue-600/30 mb-6">
                            <FilmIcon className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter">Join the Club</h1>
                        <p className="text-gray-500 font-medium text-sm mt-2 text-center">
                            Start your journey into the world of cinematic masterpieces.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                            <div className="relative group">
                                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    className="w-full bg-black/40 border-2 border-white/5 focus:border-blue-500/50 outline-none text-white px-12 py-4 rounded-2xl font-bold transition-all placeholder:text-gray-700 focus:bg-black/60"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <EnvelopeIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    className="w-full bg-black/40 border-2 border-white/5 focus:border-blue-500/50 outline-none text-white px-12 py-4 rounded-2xl font-bold transition-all placeholder:text-gray-700 focus:bg-black/60"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
                            <div className="relative group">
                                <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-black/40 border-2 border-white/5 focus:border-blue-500/50 outline-none text-white px-12 py-4 rounded-2xl font-bold transition-all placeholder:text-gray-700 focus:bg-black/60"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-blue-600/20 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-3">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-gray-500 text-sm font-medium">
                            Already have an account? {' '}
                            <Link to="/login" className="text-white font-black hover:text-blue-500 transition-colors underline underline-offset-4">
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
