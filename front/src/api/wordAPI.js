import axios from 'axios';

//axios.defaults.withCredentials = true;
const baseUrl = "http://195.191.25.72:5001/";

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