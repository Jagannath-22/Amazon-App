import axios from "axios";

const instance = axios.create({
  baseURL: window.location.hostname === "localhost"
    ? "http://127.0.0.1:5005/challenge-11226/us-central1/api" //  local emulator
    : "https://us-central1-challenge-11226.cloudfunctions.net/api", //  deployed functions
});

export default instance;
