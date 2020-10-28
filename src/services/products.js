import axios from 'axios';

const BASE_URL = '/api/products';

export const getProducts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const getItem = async (id) => {
  const response = await axios.get(BASE_URL.concat(`/${id}`));
  return response.data;
};
