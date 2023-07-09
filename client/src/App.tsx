import { Outlet } from 'react-router-dom';
import SignUpPage from './pages/SignUpIn/SignUpPage';
import SignInPage from './pages/SignUpIn/SignInPage';

function App() {
  return (
    <div className="App">
      <Outlet />
      <SignUpPage />
      <SignInPage />
    </div>
  );
}

export default App;
