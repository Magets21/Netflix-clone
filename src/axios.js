import axios from "axios";

//we define the base url so that we attach it to d/t requests in requests.js later

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});
// instance.get("/movie/top_rated");

export default instance;
