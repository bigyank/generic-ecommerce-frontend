const axios = require('axios');

export const uploadFile = async (formData) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const response = await axios.post('/api/upload', formData, config);
  return response.data;
};
