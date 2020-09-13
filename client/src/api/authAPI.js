import API from "./baseAPI.js";
import Cookies from "js-cookie";
import axios from "axios";



const authenticate = async (username, password) => {
    let axiosResponse = await API.post("/auth/login", {
      username: username,
      password: password
    })
      .then(async response => {
        Cookies.set("jwt", response.data.token);
        return { token: response.data.token };
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response);
          return { error: error.response.data.error };
        }
        return {
          error: "Invalid user/password!"
        };
      });
    return axiosResponse;
  };

export { authenticate };