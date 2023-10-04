import React, { useEffect, useState } from "react";
import "./index.css";
import {
  PlayCircleOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, setTextSearch } from "../../features/movies/moviesSlice";

const Navigation = () => {
  const { loading, movieList } = useSelector((state) => state.movies);

  const [inputisEmpty, setisEmpty] = useState(1);

  const dispatch = useDispatch();

  const [current, setCurrent] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(fetchMovies({ type: current }));
    setCurrent("movie");
  }, []);

  useEffect(() => {
    dispatch(fetchMovies({ type: current }));
  }, [current]);

  const onClick = (e) => {
    setCurrent(e);
  };

  const searchTextHandleChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    dispatch(fetchMovies({ search: searchText, type: current }));
    dispatch(setTextSearch(searchText));

    searchText.length > 0 ? setisEmpty(0) : setisEmpty(1);
  }, [searchText]);

  return (
    <>
      <div className="navigation-container">
        <div className="navigation-container-title">Movie Universe</div>
        <div className="navigation-container-link">
          <div
            className="navigation-navigate"
            style={
              current === "movie" ? { color: "#12d0bf" } : { color: "#fff" }
            }
            onClick={() => onClick("movie")}
          >
            Filmler
          </div>
          <div
            className="navigation-navigate"
            style={
              current === "series" ? { color: "#12d0bf" } : { color: "#fff" }
            }
            onClick={() => onClick("series")}
          >
            Diziler
          </div>
          <div
            className="navigation-navigate"
            style={
              current === "episode" ? { color: "#12d0bf" } : { color: "#fff" }
            }
            onClick={() => onClick("episode")}
          >
            Bölümler
          </div>
        </div>
        <div
          // className={
          //   inputisEmpty ? "navigation-container-search" : "inputStyle"
          // }
          className="navigation-container-search"
        >
          <div className="input-container">
            <input
              onChange={(e) => searchTextHandleChange(e)}
              value={searchText}
              type="text"
              placeholder="Ara..."
            />
            <SearchOutlined className="search-icon" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Navigation;
