import { BsHourglassSplit } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { HiStar } from "react-icons/hi2";

import { useMovies } from "../contexts/MoviesContext";
import { WatchedMovieType } from "../shared/types";
import StatsItem from "./StatsItem";
import { FC } from "react";

type Props = {
  movie: WatchedMovieType;
};

const WatchedMovie: FC<Props> = ({ movie }) => {
  const {
    imdbID: movieId,
    Title: title,
    Poster: poster,
    runtime,
    imdbRating,
    userRating,
  } = movie;

  const { deleteMovie } = useMovies();

  const handleDeleteMovie = () => deleteMovie(movieId);

  return (
    <li>
      <img src={poster} alt={title} />
      <h3>{title}</h3>

      <div>
        <StatsItem label={imdbRating}>
          <HiStar />
        </StatsItem>

        <StatsItem label={userRating}>
          <HiStar />
        </StatsItem>

        <StatsItem label={runtime}>
          <BsHourglassSplit />
        </StatsItem>

        <StatsItem>
          <AiFillCloseCircle onClick={handleDeleteMovie} className="red-icon" />
        </StatsItem>
      </div>
    </li>
  );
};

export default WatchedMovie;
