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

export const callAddJob = async (username, title, description)=> {

  const url = `${API_URL}/add_job`;
  const data = {
    username,
    title,
    description
  }
  let response = await axios.post(url, data);
  return response.data.success
};

export const callJobs = async (username)=> {

  const url = `${API_URL}/jobs`;
  const data = {
    username
  }
  let response = await axios.post(url, data);
  return response.data.jobs
};

export const callCreateInterview = async (username, job_id)=> {

  const url = `${API_URL}/connect_interview`;
  const data = {
    username,
    job_id
  }
  let response = await axios.post(url, data);
  return response.data.success
};
