import { type ReactElement, useEffect, type FC } from "react";

import { useMovie } from "../contexts/MovieContext";
import Loadding from "./Loadding";
import Error from "./Error";

type Props = {
  children: ReactElement;
};

const SelectedMovie: FC<Props> = ({ children }) => {
  const { isLoading, error, movie, changeSelectedId } = useMovie();

  useEffect(() => {
    if (movie) document.title = movie?.Title;

    return () => {
      document.title = "PopCorn";
    };
  }, [movie]);

  if (isLoading || !movie) return <Loadding />;
  if (error) return <Error message={error} />;

  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={() => changeSelectedId("")}>
          &larr;
        </button>

        <img src={poster} alt={`Poster of ${movie} movie`} />

        <div className="details-overview">
          <h2>{title}</h2>
          <p>{genre}</p>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>
            <span>⭐️</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>

      {children}

      <p>Starring: {actors}</p>
      <p>Directed by: {director}</p>
    </div>
  );
};

export default SelectedMovie;
