import { useEffect } from 'react';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useTokenStore = create(
  persist(
    set => ({
      token: null,
      setToken: token => set(() => ({ token }))
    }),
    {
      name: 'token'
    }
  )
);

const useToken = props => {
  const { token, setToken } = useTokenStore();

  useEffect(() => {
    if (props?.token) {
      setToken(props?.token);
    }
  }, [props?.token, setToken]);

  return { token, setToken };
};

export default useToken;
