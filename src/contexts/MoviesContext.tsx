import {
  type FC,
  type ElementType,
  ComponentPropsWithoutRef,
  useState,
  useContext,
  createContext,
  useEffect,
} from "react";

import { KEY } from "../utils/constants";
import { WatchedMovieType } from "../shared/types";
import useLocalStorage from "../hooks/useLocalStorage";

type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

type ContextStats = {
  query: string;
  isLoading: boolean;
  movies: Movie[];
  error: string;
  watchedMovies: WatchedMovieType[];
  changeQuery: (newQuery: string) => void;
  changeWatchedMovies: (newWatchedMovie: WatchedMovieType) => void;
  deleteMovie: (id: string) => void;
};

type Props = ComponentPropsWithoutRef<ElementType>;

const MoviesContext = createContext<ContextStats | null>(null);

export const MoviesContextProvider: FC<Props> = ({ children }) => {
  const [watchedMovies, setWatchedMovies] = useLocalStorage<WatchedMovieType[]>(
    [],
    "watched_Movies"
  );
  const [query, setQuery] = useState<string>("interstellar");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");

  const changeQuery = (newQuery: string) => setQuery(newQuery);
  const changeWatchedMovies = (newWatchedMovie: WatchedMovieType) =>
    setWatchedMovies((prev) => [...prev, newWatchedMovie]);
  const deleteMovie = (id: string) =>
    setWatchedMovies((prev) => prev.filter((item) => item.imdbID !== id));

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (!query) return;

        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok) throw new Error("Something went wrong");

        const data = await res.json();

        setMovies(data.Search);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        setIsLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchMovies();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const ctxValues: ContextStats = {
    query,
    isLoading,
    movies,
    error,
    watchedMovies,
    changeQuery,
    deleteMovie,
    changeWatchedMovies,
  };

  return (
    <MoviesContext.Provider value={ctxValues}>
      {children}
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (context === null) throw new Error("Something went wrong");
  return context;
};
