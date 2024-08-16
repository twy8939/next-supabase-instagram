"use client";

import Link from "next/link";

export default function MovieCard({
  movie,
}: {
  movie: {
    id: number;
    image_url: string;
    overview: string;
    popularity: number;
    release_date: string;
    title: string;
    vote_average: number;
  };
}) {
  return (
    <div className="col-span-1 relative">
      <img src={movie.image_url} className="w-full" alt={movie.title} />
      <Link href={`/movies/${movie.id}`}>
        <div className="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300">
          <p className="font-bold text-white text-xl">{movie.title}</p>
        </div>
      </Link>
    </div>
  );
}
