import { useState, useEffect } from "react";
import { KEY, Loading } from "../App";
import StarRating from "./StarRating";
import { useKey } from "../useKey";

export function MovieDetails({ id, close, onaWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [userRating, setmovieRate] = useState(0);

  const {
    Actors: actors,
    Director: director,
    Genre: genre,
    Year: year,
    Plot: plot,
    Poster: poster,
    Released: released,
    Runtime: runtime,
    Title: title,
    imdbRating,
  } = movie;

  const iswatched = watched.map((movie) => movie.imdbID).includes(id);

  const isRated = watched.find((movie) => movie.imdbID === id)?.userRating;
  function handleMovie() {
    const newMovie = {
      imdbID: id,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split("").at(0)),
      userRating,
    };
    if (!iswatched) onaWatched(newMovie);
    close();
  }

  useEffect(
    function () {
      async function getSelectMovie() {
        setisLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${id}`
        );
        const data = await res.json();
        setMovie(data);
        setisLoading(false);
      }
      getSelectMovie();
    },
    [id]
  );

  useKey("Escape", close);
  useEffect(
    function () {
      if (title) document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={close}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!iswatched ? (
                <>
                  <StarRating
                    color="yellow"
                    size={24}
                    maxRating={10}
                    getRating={setmovieRate}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleMovie}>
                      +Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {isRated}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Director by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
export function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}
