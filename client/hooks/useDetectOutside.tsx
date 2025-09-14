import React, { useEffect } from "react";

interface DetectOutsideProps {
  ref: React.RefObject<HTMLDivElement>;
  callback: () => void;
}

function useDetectOutside({ ref, callback }: DetectOutsideProps) {
  useEffect(() => {
    // handler to detect clicks outside the ref
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    // add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);

  return ref;
}

export default useDetectOutside;