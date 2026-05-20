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
        <div className="no-scrollbar mt-12 flex items-center justify-start gap-2 overflow-x-auto px-1 pb-2 sm:mt-24 sm:justify-center sm:gap-3">
            <button
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={`rounded-xl border-2 border-white/10 p-2.5 transition-all sm:p-3 ${page === 1 ? 'cursor-not-allowed opacity-20' : 'opacity-100 text-white hover:border-white/20 hover:bg-white/10'}`}
            >
                <ChevronLeftIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {startPage > 1 && (
                <>
                    <button onClick={() => onPageChange(1)} className="h-10 w-10 rounded-xl border-2 border-white/10 text-sm font-black text-white transition-all hover:border-white/20 hover:bg-white/10 sm:h-14 sm:w-14 sm:text-lg">1</button>
                    {startPage > 2 && <span className="px-1 text-lg font-black text-gray-500 sm:px-2 sm:text-xl">...</span>}
                </>
            )}

            {pageNumbers.map((num) => (
                <button
                    key={num}
                    onClick={() => onPageChange(num)}
                    className={`h-10 w-10 rounded-xl text-sm font-black transition-all sm:h-14 sm:w-14 sm:text-lg ${page === num
                        ? 'z-10 scale-105 border-2 border-purple-500 bg-purple-600 text-white shadow-2xl shadow-purple-600/40 sm:scale-110'
                        : 'border-2 border-white/10 text-white hover:border-white/20 hover:bg-white/10'
                    }`}
                >
                    {num}
                </button>
            ))}

            {endPage < totalPages && (
                <>
                    {endPage < totalPages - 1 && <span className="px-1 text-lg font-black text-gray-500 sm:px-2 sm:text-xl">...</span>}
                    <button onClick={() => onPageChange(totalPages)} className="h-10 w-10 rounded-xl border-2 border-white/10 text-sm font-black text-white transition-all hover:border-white/20 hover:bg-white/10 sm:h-14 sm:w-14 sm:text-lg">{totalPages}</button>
                </>
            )}

            <button
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                className={`rounded-xl border-2 border-white/10 p-2.5 transition-all sm:p-3 ${page === totalPages ? 'cursor-not-allowed opacity-20' : 'opacity-100 text-white hover:border-white/20 hover:bg-white/10'}`}
            >
                <ChevronRightIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
        </div>
    );
};

export default Pagination;
