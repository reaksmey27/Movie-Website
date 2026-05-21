import React from "react";
import {
  ArrowRightIcon,
  LockClosedIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import LoginButton from "../../components/auth/LoginButton";
import useAuthForm from "../../hooks/auth/useAuthForm";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { user, loading } = useAuth();
  const { formData, error, isBusy, handleChange, handleSubmit } = useAuthForm("login");

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-10 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.22),rgba(15,23,42,0))]" />
      <div className="absolute -left-30 top-24 -z-10 h-105 w-105 rounded-full bg-fuchsia-500/15 blur-[140px]" />
      <div className="absolute -bottom-30 -right-10 -z-10 h-105 w-105 rounded-full bg-cyan-500/15 blur-[140px]" />

      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <section className="max-w-2xl pt-6 lg:pt-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-200">
            <SparklesIcon className="h-4 w-4" />
            Member Access
          </div>
          <h1 className="mt-6 text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
            Sign in and pick up your next movie night instantly.
          </h1>
          <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
            Log in with your email and password or use Google to reconnect with your
            favorites, watchlist, and profile in one step.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/45">
                Fast Return
              </p>
              <p className="mt-3 text-lg font-bold text-white">
                Your saved picks stay close and ready.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/45">
                Secure Access
              </p>
              <p className="mt-3 text-lg font-bold text-white">
                Firebase-backed authentication with familiar flows.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full animate-in fade-in zoom-in duration-700">
          <div className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.72))] p-6 shadow-2xl backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-10">
            <div className="mb-8 flex flex-col items-start sm:mb-10">
              <div className="mb-6 rounded-2xl bg-fuchsia-600 p-4 shadow-xl shadow-fuchsia-600/30">
                <LockClosedIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-400">
                Use your CineMax account to continue where you left off.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-white/55">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white outline-none transition focus:border-fuchsia-400/70 focus:bg-white/8"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-white/55">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white outline-none transition focus:border-fuchsia-400/70 focus:bg-white/8"
                />
              </label>

              {error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isBusy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-fuchsia-600 px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:-translate-y-0.5 hover:bg-fuchsia-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{isBusy ? "Signing In..." : "Log In"}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/35">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-5">
              <LoginButton />
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Secure sign-in powered by Firebase Authentication
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm font-medium text-gray-500">
                Need an account?{" "}
                <Link
                  to="/register"
                  className="font-black text-white underline underline-offset-4 transition-colors hover:text-fuchsia-300"
                >
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
