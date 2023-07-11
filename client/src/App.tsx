import { Outlet } from 'react-router-dom';
import Artistpage from './pages/artistpage';

function App() {
  return (
    <div className="App">
      <Outlet />
      <Artistpage />
    </div>
  );
}

export default App;
