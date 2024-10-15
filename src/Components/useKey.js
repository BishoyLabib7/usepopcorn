import { useEffect } from "react";
export function useKey(key, action) {
  useEffect(
    function () {
      function press(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) action();
      }
      document.addEventListener("keydown", press);

      return function () {
        document.removeEventListener("keydown", press);
      };
    },
    [key, action]
  );
}
