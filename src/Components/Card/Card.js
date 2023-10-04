import React from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { fetchMovieInfo } from "../../features/movies/moviesSlice";

const Card = ({ poster, title, id }) => {
  const dispatch = useDispatch();

  const cardHandleClick = () => {
    console.log("Bir karta tıklandı! ID ", id);
    dispatch(fetchMovieInfo({ id }));
  };

  return (
    <div className="card-container" onClick={() => cardHandleClick()}>
      <div className="card-poster">
        <img src={poster} />
      </div>
      <div className="card-title card-blur">{title}</div>
    </div>
  );
};

export default Card;
