import axios from 'axios';

axios.defaults.withCredentials = true;
const baseUrl = "http://127.0.0.1:5000/";

const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: "Bearer " + token
    }
  }
}

const getWordOnServer = async (data) => {
    const config = getConfig();
    return axios.post(baseUrl + "getWord", data, config).then(res=>res)
  }

  export const WordAPI = {getWordOnServer}