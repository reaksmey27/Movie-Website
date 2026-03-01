import React from 'react';

const MovieHero = ({ movieImage, isPlaying }) => {
    if (isPlaying) return null;

    return (
        <div className="absolute inset-0 h-[50vh] sm:h-[70vh] w-full">
            <img
                src={movieImage}
                alt=""
                className="w-full h-full object-cover opacity-20 sm:opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />
        </div>
    );
};

export default MovieHero;
