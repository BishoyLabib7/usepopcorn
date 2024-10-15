import { useEffect, useState } from "react";
import { KEY } from "./App";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6868278",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNjU1YmU2NzgtZTQ5NS00ZDQzLWI5MDMtM2VjOTQwZjg1YzY5XkEyXkFqcGdeQXVyODI2MzM0MTM@._V1_SX300.jpg",
    Title: "The Test Case",
    Year: "2018",
  },
  {
    imdbID: "tt1361336",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYzE3ODhiNzAtOWY4MS00NTdiLThmNDctNDM4NjRiNGFmYjI1XkEyXkFqcGdeQXVyMTI2ODM1ODUw._V1_SX300.jpg",
    Title: "Tom & Jerry",
    Year: "2021",
  },
  {
    imdbID: "tt10872600",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_SX300.jpg",
    Title: "Spider-Man: No Way Home",
    Year: "2021",
  },
];

export function useMovies(query, callBack) {
  const [err, setErr] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [movies, setMovies] = useState(tempMovieData);

  useEffect(
    function () {
      callBack?.();
      const controller = new AbortController();

      async function fetchMoviesApi() {
        try {
          setisLoading(true);
          setErr("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Somthing went worng with fetching Movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movies not found");
          setMovies(data.Search);
        } catch (err) {
          // console.error(err.message);
          if (err.name !== "AbortError") setErr(err.message);
        } finally {
          setisLoading(false);
        }
      }

      if (query.length < 3) {
        setErr("");
        // setMovies([]);
      } else fetchMoviesApi();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, err, setMovies };
}
