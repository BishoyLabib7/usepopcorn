export function Main({ children }) {
  return <main className="main">{children}</main>;
}
export function MoviesList({ movies, onSeleted }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSeleted={onSeleted} />
      ))}
    </ul>
  );
}
function Movie({ movie, onSeleted }) {
  return (
    <li key={movie.imdbID} onClick={() => onSeleted(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
