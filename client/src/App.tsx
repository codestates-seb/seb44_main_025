import { Outlet } from 'react-router-dom';
import Artistregist from './pages/artistregistpage';

function App() {
  return (
    <div className="App">
      <Outlet />
      <Artistregist />
    </div>
  );
}

export default App;
