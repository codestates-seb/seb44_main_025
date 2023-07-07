import { Outlet } from 'react-router-dom';
import Cancelpage from './pages/cancelpage';

function App() {
  return (
    <div className="App">
      <Outlet />
      <Cancelpage />
    </div>
  );
}

export default App;
