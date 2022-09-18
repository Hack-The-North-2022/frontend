import axios from 'axios';
import { API_URL } from 'config/vars'

export const login = async (username)=> {

  const url = `${API_URL}/register`;
  const data = {
    username
  }
  let response = await axios.post(url, data);
  return response.data.success
};

export const callPairCode = async (username, code)=> {

  const url = `${API_URL}/connect_instance`;
  const data = {
    username,
    code
  }
  let response = await axios.post(url, data);
  return response.data.success
};
