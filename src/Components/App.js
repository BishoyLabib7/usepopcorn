import { useState } from "react";
import { NavBar } from "./NavBar/NavBar";
import { NumResult } from "./NavBar/NumResult";
import { Search } from "./NavBar/Search";
import { Main, MoviesList } from "./Main/Main";
import { WatchedBoxSummary, WatchedBoxList } from "./Main/WatchedBoxSummary";
import { Box, MovieDetails } from "./Main/MovieDetails";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";

export const KEY = "f84fc31d";

export default function App() {
  //useState
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  //useCustom
  const { movies, isLoading, err, setMovies } = useMovies(
    query,
    closeMovieSelected
  );

  const { watched, setWatched } = useLocalStorage([], "watched");

  // Handle Functions
  function handleSeleted(id) {
    setSelected((selectedId) => (id === selectedId ? null : id));
  }

  function closeMovieSelected() {
    setSelected(null);
  }

  function handleMovieWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteMovieWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setquery={setQuery} setMovies={setMovies} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !err && (
            <MoviesList movies={movies} onSeleted={handleSeleted} />
          )}
          {err && <ErrorMess message={err} />}
        </Box>

        <Box>
          {selected ? (
            <MovieDetails
              id={selected}
              close={closeMovieSelected}
              onaWatched={handleMovieWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedBoxSummary watched={watched} />
              <WatchedBoxList
                watched={watched}
                onDelete={handleDeleteMovieWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export function Loading() {
  return <p className="loader">loading...</p>;
}

function ErrorMess({ message }) {
  return (
    <p className="error">
      <span>⛔</span> {message}
    </p>
  );
}
