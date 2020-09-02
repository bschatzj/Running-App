import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("spotify-token");

  return axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};