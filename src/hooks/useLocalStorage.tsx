import { useEffect, useState } from "react";

// type StateType = WatchedMovieType[];

const useLocalStorage = <T,>(
  initialState: T,
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [value, setValue] = useState<T>(() => {
    const watched = localStorage.getItem(key);
    return watched ? JSON.parse(watched) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
