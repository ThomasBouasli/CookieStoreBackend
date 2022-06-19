import { Routes, Route } from 'react-router-dom';
import Main from '../Pages/Main';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Main />} />
    </Routes>
  );
}
