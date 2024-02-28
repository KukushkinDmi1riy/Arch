//const axios = require('axios');

import axios from 'axios';

const getBreeds = async () => {
  try {
    return await axios.get('https://jsonplaceholder.typicode.com/posts/1');
  } catch (error) {
    console.error(error);
  }
};

const countBreeds = async () => {
  const data = await getBreeds();
  console.log(data);
};

countBreeds();
