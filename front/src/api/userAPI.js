import axios from 'axios';

axios.defaults.withCredentials = true;
const baseUrl = "http://127.0.0.1:5000/";

const getConfig = () => {
  const accessToken = localStorage.getItem('accessToken');
  return {
    headers: {
      Authorization: "Bearer " + accessToken
    }
  }
}

const loginOnServer = async (email, password) => {
  return axios.post(baseUrl + "login", {email, password}).then(res=>res)
}
const registerOnServer = async (username, email, password) => {
  return axios.post(baseUrl + "registration", {username, email, password}).then(res=>res)
}
const logoutOnServer = async () => {
  return axios.get(baseUrl + "logout").then(res=>res)
}

// + interrupt
const instance = axios.create({
  baseURL: baseUrl
})

instance.interceptors.response.use(
  (response)=>{
    return response;
  }, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
      try {
      
          const res = await axios.get(baseUrl + "refreshtoken");
          localStorage.setItem('token', res.data.accessToken);
          originalRequest.headers.Authorization = 'Bearer ' + res.data.accessToken;
          return instance.request(originalRequest);
      } catch (e) {
          console.log('Error')
          localStorage.removeItem('token');
      }
    }
    return error.response;
  }
);

const getUserOnServer = async (token) => {
  const config = getConfig();
  const data = instance.get("getuser", config);
  return data;
}


export const UserAPI = {loginOnServer, registerOnServer, logoutOnServer, getUserOnServer}