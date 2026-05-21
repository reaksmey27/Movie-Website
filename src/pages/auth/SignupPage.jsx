import React from "react";
import {
  ArrowRightIcon,
  SparklesIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import LoginButton from "../../components/auth/LoginButton";
import useAuthForm from "../../hooks/auth/useAuthForm";
import { useAuth } from "../../context/AuthContext";

const SignupPage = () => {
  const { user, loading } = useAuth();
  const { formData, error, isBusy, handleChange, handleSubmit } = useAuthForm("register");

  if (!loading && user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 pb-10 pt-24 sm:px-6 sm:pb-16 sm:pt-28 lg:px-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),rgba(15,23,42,0))]" />
      <div className="absolute -left-30 top-24 -z-10 h-105] w-105 rounded-full bg-sky-500/15 blur-[140px]" />
      <div className="absolute -bottom-30 -right-10 -z-10 h-105 w-105 rounded-full bg-indigo-500/15 blur-[140px]" />

      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section className="max-w-2xl pt-6 lg:pt-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-sky-200">
            <SparklesIcon className="h-4 w-4" />
            New Account
          </div>
          <h1 className="mt-6 text-4xl font-black uppercase tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
            Create your member pass and start building your movie world.
          </h1>
          <p className="mt-5 max-w-xl text-sm font-medium leading-7 text-slate-300 sm:text-base">
            Register with email and password in a few seconds, or use Google if you want the
            faster route into CineMax.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/45">
                Personal Space
              </p>
              <p className="mt-3 text-lg font-bold text-white">
                Save favorites, shape your taste, and keep a clean profile.
              </p>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/45">
                Flexible Entry
              </p>
              <p className="mt-3 text-lg font-bold text-white">
                Use email and password today, switch to Google anytime.
              </p>
            </div>
          </div>
        </section>

        <div className="w-full animate-in fade-in zoom-in duration-700">
          <div className="rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(15,23,42,0.72))] p-6 shadow-2xl backdrop-blur-2xl sm:rounded-[2.5rem] sm:p-10">
            <div className="mb-8 flex flex-col items-start sm:mb-10">
              <div className="mb-6 rounded-2xl bg-sky-600 p-4 shadow-xl shadow-sky-600/30">
                <UserPlusIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tighter text-white">
                Join CineMax
              </h2>
              <p className="mt-2 text-sm font-medium text-gray-400">
                Create an account to sync your identity and movie collections.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-white/55">
                  Full Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="Movie lover name"
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white outline-none transition focus:border-sky-400/70 focus:bg-white/8"
                />
              </label>

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
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white outline-none transition focus:border-sky-400/70 focus:bg-white/8"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-white/55">
                    Password
                  </span>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white outline-none transition focus:border-sky-400/70 focus:bg-white/8"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.25em] text-white/55">
                    Confirm Password
                  </span>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    placeholder="Repeat your password"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white outline-none transition focus:border-sky-400/70 focus:bg-white/8"
                  />
                </label>
              </div>

              {error ? (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-200">
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isBusy}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-4 text-sm font-black uppercase tracking-[0.2em] text-white transition-all hover:-translate-y-0.5 hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{isBusy ? "Creating Account..." : "Create Account"}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white/35">
                Or sign up with
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="space-y-5">
              <LoginButton label="Sign Up with Google" />
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                Popup account creation powered by Firebase Authentication
              </p>
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm font-medium text-gray-500">
                Already have access?{" "}
                <Link
                  to="/login"
                  className="font-black text-white underline underline-offset-4 transition-colors hover:text-sky-300"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
