import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const Pagination = ({ page, totalPages, onPageChange }) => {
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

    return (
        <div className="flex items-center justify-center gap-3 mt-24">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={`p-3 rounded-xl border-2 border-white/10 transition-all ${page === 1 ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:bg-white/10 text-white hover:border-white/20'}`}
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>

            {startPage > 1 && (
                <>
                    <button onClick={() => onPageChange(1)} className="w-14 h-14 rounded-xl border-2 border-white/10 text-white hover:border-white/20 hover:bg-white/10 transition-all text-lg font-black">1</button>
                    {startPage > 2 && <span className="text-gray-500 font-black px-2 text-xl">...</span>}
                </>
            )}

            {pageNumbers.map((num) => (
                <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`w-14 h-14 rounded-xl font-black transition-all text-lg ${page === num
                        ? 'bg-purple-600 text-white shadow-2xl shadow-purple-600/40 border-2 border-purple-500 scale-110 z-10'
                        : 'border-2 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                    {num}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="text-gray-500 font-black px-2 text-xl">...</span>}
                    <button onClick={() => onPageChange(totalPages)} className="w-14 h-14 rounded-xl border-2 border-white/10 text-white hover:border-white/20 hover:bg-white/10 transition-all text-lg font-black">{totalPages}</button>
                </>
            )}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className={`p-3 rounded-xl border-2 border-white/10 transition-all ${page === totalPages ? 'opacity-20 cursor-not-allowed' : 'opacity-100 hover:bg-white/10 text-white hover:border-white/20'}`}
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>
        </div>
    );
};

export default Pagination;
