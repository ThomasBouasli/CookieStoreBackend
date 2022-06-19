import { Routes, Route } from 'react-router-dom';
import SignIn from '../Pages/SignIn';
import LandingPage from '../Pages/LandingPage';
import LogIn from '../Pages/LogIn';

export default function NoAuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/log-in" element={<LogIn />} />
    </Routes>
  );
}
