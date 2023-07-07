import { Outlet } from 'react-router-dom';
import Artistregist from './pages/artistregistpage';
import Editmypage from './pages/editmypage';

function App() {
  return (
    <div className="App">
      <Outlet />
      <Editmypage />
    </div>
  );
}

export default App;
