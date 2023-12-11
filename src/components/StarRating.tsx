import { toast } from "react-hot-toast";
import { useState } from "react";

import Star from "./Star";
import { useMovies } from "../contexts/MoviesContext";
import { useMovie } from "../contexts/MovieContext";
import { MovieType, WatchedMovieType } from "../shared/types";

const StarRating = () => {
  const [tempRating, setTempRating] = useState<number>();
  const [rating, setRating] = useState<number>();

  const { movie, selectedId, changeSelectedId } = useMovie();
  const { watchedMovies, changeWatchedMovies } = useMovies();

  const onClicked = (ind: number) => setRating(ind);
  const onMouseEntered = (ind: number) => setTempRating(ind);
  const onMouseLeaved = () => setTempRating(rating);

  const addMovie = () => {
    const {
      imdbID,
      Title,
      Year,
      Poster,
      Runtime: runtime,
      imdbRating,
    } = movie as MovieType;

    if (!rating) return toast.error("Please provide rating");

    const newMovie: WatchedMovieType = {
      imdbID,
      Title,
      Year,
      Poster,
      runtime: parseInt(runtime),
      imdbRating,
      userRating: rating,
    };

    changeWatchedMovies(newMovie);
    changeSelectedId("");

    toast.success("The movie added to your list");
  };

  const watchedMovie = watchedMovies.find(
    (watched) => watched.imdbID === selectedId
  );

  const isRated = Boolean(watchedMovie?.imdbID);

  return (
    <section className="rating-section">
      <div className="rating-overview">
        {!isRated && (
          <div className="ratings">
            <div className="stars">
              {Array.from({ length: 10 }).map((_, ind) => (
                <Star
                  key={ind}
                  onClicked={onClicked}
                  onMouseEntered={onMouseEntered}
                  onMouseLeaved={onMouseLeaved}
                  index={ind + 1}
                  fill={
                    tempRating
                      ? tempRating >= ind + 1
                      : (rating as number) >= ind + 1
                  }
                />
              ))}
            </div>

            <div className="rating">{tempRating || rating || ""}</div>
          </div>
        )}

        {isRated && (
          <p>You rate this movie with {watchedMovie!.userRating} stars</p>
        )}

        {!isRated && rating && (
          <button className="btn-add" onClick={addMovie}>
            +Add to list
          </button>
        )}
      </div>
    </section>
  );
};

export default StarRating;
