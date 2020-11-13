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

export const getDetails = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(BASE_URL.concat(`/${id}`), config);
  return response.data;
};

export const updatePay = async (token, id, paymentResult) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    BASE_URL.concat(`/${id}/pay`),
    paymentResult,
    config
  );
  return response.data;
};

export const userOrder = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(BASE_URL.concat('/myorders'), config);
  return response.data;
};

export const getAllOrder = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(BASE_URL, config);
  return response.data;
};

export const updateOrder = async (token, id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    BASE_URL.concat(`/${id}/deliver`),
    {},
    config
  );
  return response.data;
};
