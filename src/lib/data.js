const key = "901b086b";

const getMovies = async ({ s, p, t }) => {
  // You should send parameters this example for search => '&s=search'
  // For page => '&p=1', '&p=2' ...
  // For type => '&type=movie' , '&type = series', '&type = episode'

  let link = `https://www.omdbapi.com/?apikey=${key}${s}${p}${t}`;

  console.log("Link: ", link);

  const response = await fetch(link);

  const data = await response.json();

  return data;
};

const getMovieInfo = async ({ i }) => {
  // In this example, you should include the 'id' parameter in the search query.
  // For instance, if you're searching for the movie with the IMDb ID 'tt1285016',
  // you should append '&i=tt1285016' to the search query.

  let link = `https://www.omdbapi.com/?apikey=${key}${i}`;

  const response = await fetch(link);

  const data = await response.json();

  return data;
};

export { getMovies, getMovieInfo };
