import axios from 'axios';

const BASE_URL = '/api/user';

export const userLogin = async (email, password) => {
  const response = await axios.post(BASE_URL.concat('/login'), {
    email,
    password,
  });
  return response.data;
};

export const userSignup = async (name, email, password) => {
  const response = await axios.post(BASE_URL.concat('/signup'), {
    name,
    email,
    password,
  });

  return response.data;
};

export const userProfile = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(BASE_URL.concat('/profile'), config);
  return response.data;
};

export const updateProfile = async (token, user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(BASE_URL.concat('/profile'), user, config);
  return response.data;
};

export const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(BASE_URL.concat('/all'), config);
  return response.data;
};
