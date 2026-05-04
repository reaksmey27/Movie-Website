import React from "react";
import { FilmIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import LoginButton from "../../components/auth/LoginButton";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { user, loading } = useAuth();

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
      <div className="absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-700">
        <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-2xl">
          <div className="mb-10 flex flex-col items-center">
            <div className="mb-6 rounded-2xl bg-purple-600 p-4 shadow-xl shadow-purple-600/30">
              <FilmIcon className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-center text-3xl font-black uppercase tracking-tighter text-white">
              Welcome Back
            </h1>
            <p className="mt-2 text-center text-sm font-medium text-gray-400">
              Sign in with Google to sync your profile and keep your session across refreshes.
            </p>
          </div>

          <div className="space-y-5">
            <LoginButton />
            <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
              Secure popup sign-in powered by Firebase Authentication
            </p>
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm font-medium text-gray-500">
              New here?{" "}
              <Link
                to="/signup"
                className="font-black text-white underline underline-offset-4 transition-colors hover:text-purple-400"
              >
                Continue with Google
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
