import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/challenge-7df2f/us-central1/api", // API(cloud function) url
});

export default instance;
