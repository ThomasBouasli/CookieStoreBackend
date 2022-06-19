import { Routes, Route } from 'react-router-dom';
import SignIn from '../Pages/SignIn';
import Home from '../Pages/Home';

export default function NoAuthRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}
