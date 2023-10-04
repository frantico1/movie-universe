import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HeaderNavi from "./Components/Navigation/Navigation";
import ListMovie from "./Components/listContainer/ListMovie";
import MovieSlider from "./Components/MovieSlider/MovieSlider";

function App() {
  return (
    // <Router>
    //   <HeaderNavi />
    //   <Routes>
    //     <Route path="/" element={<List />} />
    //   </Routes>
    // </Router>
    <>
      <HeaderNavi />
      <ListMovie />
      <MovieSlider />
    </>
  );
}

export default App;
