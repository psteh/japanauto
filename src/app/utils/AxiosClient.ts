import axios from 'axios';

if (localStorage) {
  const tokenStore = localStorage.getItem('token');
  let token = null;

  if (tokenStore) {
    token = JSON.parse(tokenStore).state.token || null;
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  });
}

export default axios;
