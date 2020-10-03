import axios from "axios";

export const axiosWithAuth = () => {
    const token = localStorage.getItem("token");

    return axios.create({
        baseURL: "http://localhost:3500/api",
        headers: {
            Authorization: `${token}`
        }
    });
};