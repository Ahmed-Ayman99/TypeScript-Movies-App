import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactElement,
  type FC,
} from "react";

import { KEY } from "../utils/constants";
import { MovieType } from "../shared/types";

interface Props {
  children: ReactElement;
}

type ContextStats = {
  movie: MovieType | null;
  isLoading: boolean;
  error: string;
  selectedId: string | null;
  changeSelectedId: (newId: string) => void;
};

const MovieContext = createContext<ContextStats | null>(null);

export const MovieContextProvider: FC<Props> = ({ children }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const changeSelectedId = (newId: string) => setSelectedId(newId);

  useEffect(() => {
    (async () => {
      try {
        if (!selectedId) return;

        setIsLoading(true);
        setError("");

        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );

        const data = await res.json();

        console.log(data);

        if (data && data.Title && data.Plot) setMovie(data);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setIsLoading(false);
      }
    })();
  }, [selectedId]);

  const ctxValues: ContextStats = {
    movie,
    isLoading,
    error,
    selectedId,
    changeSelectedId,
  };
  return (
    <MovieContext.Provider value={ctxValues}>{children}</MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = useContext(MovieContext);

  if (!context) throw new Error("Something went wrong");

  return context;
};
