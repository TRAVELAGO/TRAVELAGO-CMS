import { useEffect } from "react";

export const useClickOutside = (ref, onClickOutside) => {
  useEffect(() => {
    console.log();
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, ref]);
};
