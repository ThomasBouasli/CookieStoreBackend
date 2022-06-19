import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useBackend from '../Hooks/useBackend';
import Home from '../Pages/Home';

export default function AuthRoutes() {
  const { VerifyToken } = useBackend();

  useEffect(() => {
    VerifyToken();
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
