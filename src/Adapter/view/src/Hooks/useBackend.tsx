import axios from 'axios';
import { useCallback, useMemo } from 'react';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';

export default function useBackend() {
  const navigate = useNavigate();

  const paths = useMemo(() => {
    return {
      register: '/api/register',
      verifyToken: '/api/verify-token',
      getAllCookiesFromUser: '/api/cookies',
      bakeCookie: '/api/bake',
      logIn: '/api/login'
    };
  }, []);

  if (process.env.NODE_ENV === 'development') {
    paths.register = 'http://localhost:3333/api/register';
    paths.verifyToken = 'http://localhost:3333/api/verify-token';
    paths.getAllCookiesFromUser = 'http://localhost:3333/api/cookies';
    paths.bakeCookie = 'http://localhost:3333/api/bake';
    paths.logIn = 'http://localhost:3333/api/login';
  }

  const Register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const { data } = await axios.post(paths.register, {
          name,
          email,
          password
        });

        localStorage.setItem('token', data.token);

        navigate('/home');

        return;
      } catch (error: any) {
        Store.addNotification({
          title: 'Error!',
          message: error.response.data.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });

        return;
      }
    },
    [navigate, paths]
  );

  const LogIn = useCallback(
    async (email: string, password: string) => {
      try {
        const { data } = await axios.post(paths.logIn, {
          email,
          password
        });

        localStorage.setItem('token', data.token);

        navigate('/home');

        return;
      } catch (error: any) {
        Store.addNotification({
          title: 'Error!',
          message: error.response.data.message,
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated', 'animate__fadeIn'],
          animationOut: ['animate__animated', 'animate__fadeOut'],
          dismiss: {
            duration: 5000,
            onScreen: true
          }
        });

        return;
      }
    },
    [navigate, paths]
  );

  const VerifyToken = useCallback(async () => {
    const { data } = await axios.get(paths.verifyToken, {
      headers: {
        Authorization: localStorage.getItem('token') ?? ''
      }
    });

    if (!data.isValid) {
      localStorage.removeItem('token');
      navigate('/');
    }
  }, [navigate, paths]);

  const getAllCookiesFromUser = useCallback(async () => {
    try {
      const { data } = await axios.get(paths.getAllCookiesFromUser, {
        headers: {
          Authorization: localStorage.getItem('token') ?? ''
        }
      });

      return data;
    } catch (error: any) {
      Store.addNotification({
        title: 'Error!',
        message: error.response.data.message,
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });

      return;
    }
  }, [paths]);

  const bakeCookie = useCallback(async () => {
    try {
      const { data } = await axios.post(
        paths.bakeCookie,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('token') ?? ''
          }
        }
      );

      return data;
    } catch (error: any) {
      Store.addNotification({
        title: 'Error!',
        message: error.response.data.message,
        type: 'danger',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });

      return;
    }
  }, [paths]);

  return {
    Register,
    LogIn,
    VerifyToken,
    getAllCookiesFromUser,
    bakeCookie
  };
}
