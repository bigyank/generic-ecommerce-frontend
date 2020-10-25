import axios from 'axios';

export const getProducts = async () => {
  const response = await axios.get('/api/products');
  return response.data;
};

export const getItem = async (id) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};
