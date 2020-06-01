import API from "./baseAPI.js";
//well the api post works but it still catches an error for some reason


const authenticate = async (username, password) => {
    let axiosResponse = await API.post("/admin/login", {
      username: username,
      password: password
    })
      .then(async response => {
        console.log("here")
        return { token: response.data.token };
      })
      .catch(error => {
        return {
          error: "Invalid user/password!"
        };
      });
    console.log(axiosResponse)
    return axiosResponse;
  };

export { authenticate };