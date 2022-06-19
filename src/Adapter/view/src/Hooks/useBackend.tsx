import axios from 'axios';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';

export default function useBackend() {
  const navigate = useNavigate();

  async function Register(name: string, email: string, password: string) {
    try {
      const { data } = await axios.post('/api/register', {
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
  }

  async function VerifyToken() {
    const { data } = await axios.get('/api/verify-token', {
      headers: {
        Authorization: localStorage.getItem('token') ?? ''
      }
    });

    if (!data.isValid) {
      localStorage.removeItem('token');
      navigate('/');
    }
  }

  return {
    Register,
    VerifyToken
  };
}
