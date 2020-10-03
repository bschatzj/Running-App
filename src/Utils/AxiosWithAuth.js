import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("spotify-token");

  return axios.create({
    baseURL: "https://api.spotify.com/v1/",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default axiosWithAuth