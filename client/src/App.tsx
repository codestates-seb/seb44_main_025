import { Outlet } from 'react-router-dom';
import Mypage from './pages/mypage';

function App() {
  return (
    <div className="App">
      <Outlet />
      <Mypage />
    </div>
  );
}

export default App;
