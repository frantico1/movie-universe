import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";
import { Spin } from "antd";
import "./index.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const MovieSlider = () => {
  const { loading, error, movieList, searchText } = useSelector(
    (state) => state.movies
  );

  const [filterMovies, setFilterMovies] = useState([]);
  const [isFilterData, setIsFilterData] = useState(false);

  const [moviesPage, setMoviesPage] = useState(1);

  const filterToData = () => {
    if (movieList.Response === "True") {
      let filterList = [];
      if (isFilterData === false) {
        movieList.Search.map((item, index) => {
          if (index < 5) {
            if (item.Poster !== "N/A") {
              filterList.push(item);
            } else {
              const changePoste = {
                ...item,
                Poster:
                  "https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg",
              };

              filterList.push(changePoste);
            }
          }
        });
        setIsFilterData(true);
      }

      if (isFilterData) {
        movieList.Search.map((item, index) => {
          if (index > 4) {
            // filterList.push(item);
            if (item.Poster !== "N/A") {
              console.log("Girdi1 2");

              filterList.push(item);
            } else {
              console.log("Girdi 3");
              const changePoste = {
                ...item,
                Poster:
                  "https://t4.ftcdn.net/jpg/00/89/55/15/360_F_89551596_LdHAZRwz3i4EM4J0NHNHy2hEUYDfXc0j.jpg",
              };

              filterList.push(changePoste);
            }
          }
        });
        setIsFilterData(false);
      }

      setFilterMovies(filterList);
    }
  };

  useEffect(() => {
    if (movieList.Search !== undefined) {
      filterToData();
    }
    if (movieList.totalResults !== undefined) {
      setMoviesPage(Math.ceil(movieList.totalResults / 10));
    }
  }, [movieList]);

  useEffect(() => {
    console.log("GET SEARCH:  ", searchText.length);

    if (searchText === undefined || searchText.length === 0) {
      setFilterMovies([]);
      setMoviesPage(1);
    }
  }, [searchText]);

  const nextData = () => {
    let filterList = [];
    if (isFilterData === false) {
      movieList.Search.map((item, index) => {
        if (index < 5) {
          filterList.push(item);
          console.log(item);
        }
      });

      setIsFilterData(true);
    }
  };

  const returnPageButton = () => {
    let array = [];
    console.log("isd");

    for (let i = 1; i <= moviesPage; i++) {
      array.push(i);
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <div className="list-slider-container">
            <div className="list-slider-buttons" onClick={() => filterToData()}>
              <LeftOutlined style={{ fontSize: "50px", color: "#fff" }} />
            </div>
            {filterMovies && filterMovies.length > 0 ? (
              filterMovies.map((item, index) => (
                <Card
                  title={item.Title}
                  key={index}
                  poster={item.Poster}
                  id={item.imdbID}
                />
              ))
            ) : (
              <p className="list-slider-not-result">Sonuç Bulunamadı</p>
            )}
            <div className="list-slider-buttons" onClick={() => filterToData()}>
              <RightOutlined style={{ fontSize: "50px", color: "#fff" }} />
            </div>
          </div>
        </>
      ) : (
        <div className="list-slider-loading">
          <Spin />
        </div>
      )}
      <div className="list-slider-pages"></div>
    </>
  );
};

export default MovieSlider;
