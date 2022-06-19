import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useBackend from '../Hooks/useBackend';
import Main from '../Pages/Main';

export default function AuthRoutes() {
  const { VerifyToken } = useBackend();

  useEffect(() => {
    VerifyToken();
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Main />} />
    </Routes>
  );
}
