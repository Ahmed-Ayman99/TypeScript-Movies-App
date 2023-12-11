import { FC } from "react";
import { useMovie } from "../contexts/MovieContext";

interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

type Props = {
  movie: Movie;
  selected: boolean;
};

const Movie: FC<Props> = ({ movie, selected }) => {
  const { Poster: poster, Title: title, Year: year, imdbID: movieId } = movie;
  const { changeSelectedId } = useMovie();

  const handleSelectedMovie = () => changeSelectedId(movieId);

  return (
    <li className={selected ? "active" : ""} onClick={handleSelectedMovie}>
      <img src={poster} alt={title} className="poster" />
      <h3>{title}</h3>

      <div>
        <p>
          <span>🗓</span>
          <span>{year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
