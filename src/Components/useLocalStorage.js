import { useEffect, useState } from "react";
export function useLocalStorage(intionState, key) {
  const [watched, setWatched] = useState(function () {
    const storage = JSON.parse(localStorage.getItem(key));
    return storage ? storage : intionState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(watched));
    },
    [watched, key]
  );
  return { watched, setWatched };
}
