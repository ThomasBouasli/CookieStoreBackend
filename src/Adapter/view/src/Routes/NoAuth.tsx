import { Routes, Route } from 'react-router-dom';
import SignIn from '../Pages/SignIn';
import LandingPage from '../Pages/LandingPage';

export default function NoAuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}
