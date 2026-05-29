import React, { useEffect, useRef, useState } from "react";
import {
  XMarkIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";

const DonationModal = ({ isOpen, onClose }) => {
  const panelRef = useRef(null);
  const [copied, setCopied] = useState(null); // 'name' | 'number' | null

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const handleBackdropMouseDown = (e) => {
    if (!panelRef.current) return;
    if (panelRef.current.contains(e.target)) return;
    onClose?.();
  };

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(field);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Donation QR"
      onMouseDown={handleBackdropMouseDown}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[var(--color-overlay)] backdrop-blur-md" />

      {/* Modal Panel */}
      <div
        ref={panelRef}
        className="relative w-full max-w-lg rounded-3xl border border-[var(--color-border)] bg-[var(--color-panel-bg)] shadow-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 0 60px rgba(139, 92, 246, 0.15), 0 25px 50px rgba(0,0,0,0.25)",
        }}
      >
        {/* Purple glow top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-8 bg-purple-500/10 blur-xl rounded-full" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div className="flex items-center gap-3">
            {/* Animated heart icon */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-purple-500/15 border border-purple-500/20">
              <HeartIcon className="h-5 w-5 text-purple-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-base font-black text-white tracking-tight">
                Support CineMax
              </h2>
              <p className="text-xs text-gray-500 font-medium">
                Your kindness keeps us going
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-xl border border-white/10 bg-white/5 text-gray-400 transition-all hover:border-white/20 hover:text-white hover:bg-white/10 active:scale-95"
            aria-label="Close"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/5 mx-6" />

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Thank you message */}
          <div className="rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-900/10 border border-purple-500/15 px-4 py-3.5">
            <p className="text-sm text-white/80 font-medium leading-relaxed">
              <span className="text-purple-300 font-bold">Thank you</span> for
              supporting CineMax. Every contribution means the world to us! 🙏
            </p>
            <p className="mt-2 text-xs text-purple-300/70 font-medium leading-relaxed">
              សូមអរគុណចំពោះការគាំទ្រ CineMax ❤️
              ទឹកចិត្តរបស់អ្នកមានន័យខ្លាំងណាស់។
            </p>
          </div>

          {/* QR + Payment side by side */}
          <div className="flex gap-4 items-stretch">
            {/* LEFT — QR Code (no border style, original image only) */}
            <div className="flex flex-col items-center shrink-0">
              <div className="rounded-2xl overflow-hidden w-40">
                <div className="bg-[#c0392b] px-3 py-2 flex items-center justify-center">
                  <span className="text-white font-black text-xs tracking-widest">
                    KHQR
                  </span>
                </div>
                <div className="bg-white p-2">
                  <img
                    src="/src/assets/images/donation-qr.png"
                    alt="Donation QR Code"
                    className="w-full h-auto border-0 outline-none"
                    decoding="async"
                  />
                </div>
              </div>
              <p className="mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                Scan to donate
              </p>
            </div>

            {/* RIGHT — Payment Info */}
            <div className="flex-1 rounded-2xl border border-white/8 bg-white/4 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-2.5 border-b border-white/5">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Payment Info
                </span>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wide">
                  ABA Bank
                </span>
              </div>

              {/* Account Name */}
              <div className="px-3 py-2.5 border-b border-white/5">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                  Account Name
                </p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-white truncate">
                    SAN REAKSMEY
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy("SAN REAKSMEY", "name")}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 transition-all hover:border-purple-500/40 hover:text-purple-400 hover:bg-purple-500/10 active:scale-95 shrink-0"
                  >
                    {copied === "name" ? (
                      <>
                        <CheckIcon className="h-3 w-3 text-green-400" />
                        <span className="text-green-400">Done</span>
                      </>
                    ) : (
                      <>
                        <ClipboardDocumentIcon className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Account Number */}
              <div className="px-3 py-2.5 border-b border-white/5">
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">
                  Account Number
                </p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-white font-mono tracking-wider">
                    006 419 870
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy("006419870", "number")}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 transition-all hover:border-purple-500/40 hover:text-purple-400 hover:bg-purple-500/10 active:scale-95 shrink-0"
                  >
                    {copied === "number" ? (
                      <>
                        <CheckIcon className="h-3 w-3 text-green-400" />
                        <span className="text-green-400">Done</span>
                      </>
                    ) : (
                      <>
                        <ClipboardDocumentIcon className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Bank note */}
              <div className="px-3 py-2.5">
                <p className="text-[10px] text-gray-600 leading-relaxed">
                  Open your ABA app, scan the QR or enter the account number
                  above to donate. Thank you! 🙏
                </p>
              </div>
            </div>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-2xl bg-purple-600 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-purple-500 active:scale-[0.98]"
            style={{ boxShadow: "0 4px 20px rgba(139, 92, 246, 0.3)" }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationModal;
