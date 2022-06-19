import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthRoutes from './Routes/AuthRoutes';
import NoAuthRoutes from './Routes/NoAuth';

function App() {
  return (
    <>
      <ReactNotifications />
      <Router>
        <NoAuthRoutes />
        <AuthRoutes />
      </Router>
    </>
  );
}

export default App;
