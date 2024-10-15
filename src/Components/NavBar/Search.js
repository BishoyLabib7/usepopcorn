import { useRef } from "react";
import { useKey } from "../useKey";

export function Search({ query, setquery, setMovies }) {
  //useRef
  const inputEl = useRef(null);

  //useCustom
  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setquery("");
    setMovies([]);
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setquery(e.target.value)}
      ref={inputEl}
    />
  );
}
