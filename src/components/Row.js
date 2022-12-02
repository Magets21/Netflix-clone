import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";
//import instance in axios.js as axios w/h was exported as default
import axios from "../axios";
//base url for images
const base_url = "https://image.tmdb.org/t/p/original/";

//we have props as title, fetchUrl
function Row({ title, fetchUrl, isLargeRow }) {
  // the url differs as they are variables, so to handle the variables, we need state to store url variables.
  //movies - to hold movies
  // setMovies - to update our movies
  //[] - we initialize the list of movies-initial state of our movies
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      //combine baseUrl in axios.js and d/t url in requests.js (fetchUrl)
      //axios is a promise but syntactic sugar meaning it beautifies and simplify syntax we know in fetch, .then, .catch method

      const request = await axios.get(fetchUrl);
      // console.log(request);
      setMovies(request.data.results);
      //   console.log(request.data.results);

      return request;
    }
    fetchData();
    //    we want the data to be fetched when fetchUrl changes
  }, [fetchUrl]);
  console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      //movieTrailer () method returns a url
      movieTrailer(
        movie?.title ||
          movie?.name ||
          movie?.original_name ||
          movie?.original_title
      )
        //to parse out the parameters from the query string.
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies?.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            // if isLargeRow exists, apply row__posterLarge className
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              // if isLargeRow variable exists, image will be movie.poster_path(poster), if not movie will be movie.backdrop_path (thumbnail)
              // using Ternary Operator

              //I add this as work around movie.backdrop_path || movie.poster_path
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>

      <div style={{ padding: "40px" }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  );
}

export default Row;
