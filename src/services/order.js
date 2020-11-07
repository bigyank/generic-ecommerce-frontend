import axios from 'axios';

const BASE_URL = '/api/orders';

export const makeOrder = async (token, order) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(BASE_URL, order, config);
  return response.data;
};