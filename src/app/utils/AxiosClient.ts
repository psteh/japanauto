import axios from 'axios';

const APIClient = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const tokenStore = window.localStorage.getItem('token');
    let token: string | null = null;

    if (tokenStore) {
      token = JSON.parse(tokenStore).state.token || null;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`;

      return config;
    });
  }

  return axios;
};

export default APIClient();
