import React, { useEffect, useState } from "react";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { PlayCircleOutlined, StarOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { calculateBackgroundColor } from "../../lib/colorPicker";
import { setMovieInfo } from "../../features/movies/moviesSlice";

const ListMovie = () => {
  const { loadingInfo, movieList, movieInfo, searchText } = useSelector(
    (state) => state.movies
  );
  const [ınfo, setInfo] = useState({ movieInfo });
  const [backgroundColor, setBackgroundColor] = useState("");
  const [numericRating, setNumericRating] = useState();
  const [starRating, setStarRating] = useState();

  const maxRating = 10;

  const dispatch = useDispatch();

  useEffect(() => {
    if (movieInfo) {
      setInfo(movieInfo);
      calculateBackgroundColor(movieInfo.Poster)
        .then((result) => {
          const mostUsedColor = result;
          setBackgroundColor(mostUsedColor);
          setNumericRating(parseFloat(movieInfo?.Ratings[0].Value));
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }, [movieInfo]);

  useEffect(() => {
    setStarRating((numericRating / maxRating) * 10);
  }, [numericRating]);

  useEffect(() => {
    if (searchText.length === 0) {
      dispatch(setMovieInfo({}));
      setNumericRating();
      setStarRating();
    }
  }, [searchText]);

  const stars = Array.from(
    { length: Math.floor(starRating) },
    (_, index) => index + 1
  );

  const starIcons = stars.map((star) => (
    <span className="list-star" key={star}>
      &#9733;
    </span>
  ));

  return (
    <div className="list-container">
      <div
        className="list-card-info"
        style={
          backgroundColor
            ? { backgroundColor: backgroundColor }
            : { backgroundColor: "black" }
        }
      >
        <div className="list-title list-blur">
          <h1>
            {loadingInfo ? (
              <Spin style={{ alignSelf: "center" }} />
            ) : (
              movieInfo !== undefined && movieInfo.Title
            )}
          </h1>
        </div>
        <div className="list-season list-blur">
          {loadingInfo ? (
            <Spin style={{ alignSelf: "center" }} />
          ) : (
            movieInfo !== undefined && movieInfo.Season
          )}
        </div>

        <div className="list-rate list-blur">
          {loadingInfo ? <Spin style={{ alignSelf: "center" }} /> : starIcons}

          {loadingInfo ? (
            <Spin style={{ alignSelf: "center" }} />
          ) : (
            movieInfo &&
            movieInfo.Ratings &&
            movieInfo.Ratings.length > 0 &&
            movieInfo.Ratings[0].Value
          )}
        </div>
        <div className="list-category list-blur">
          {loadingInfo ? (
            <Spin style={{ alignSelf: "center" }} />
          ) : (
            movieInfo !== undefined && movieInfo.Genre
          )}
        </div>
        <div className="list-buttons list-blur">
          {loadingInfo ? (
            <Spin style={{ alignSelf: "center" }} />
          ) : (
            movieInfo !== undefined && movieInfo.Title
          )}
        </div>
        <div className="list-movie-info list-blur">
          {loadingInfo ? (
            <Spin style={{ alignSelf: "center" }} />
          ) : (
            movieInfo !== undefined && movieInfo.Plot
          )}
        </div>
      </div>
      <div
        className="list-poster"
        style={
          backgroundColor
            ? { backgroundColor: backgroundColor }
            : { backgroundColor: "black" }
        }
      >
        {loadingInfo ? (
          <Spin style={{ alignSelf: "center" }} />
        ) : (
          <img src={movieInfo !== undefined && movieInfo.Poster} />
        )}
      </div>
    </div>
  );
};

export default ListMovie;
