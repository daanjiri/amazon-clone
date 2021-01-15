import axios from "axios";

const instance = axios.create({
  //"https://us-central1-challenge-7df2f.cloudfunctions.net/api",
  baseURL: "https://us-central1-challenge-7df2f.cloudfunctions.net/api", //"http://localhost:5001/challenge-7df2f/us-central1/api", // API(cloud function) url
});

export default instance;
