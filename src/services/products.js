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

export const deleteProduct = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(BASE_URL.concat(`/${id}`), config);
  return response.data;
};
