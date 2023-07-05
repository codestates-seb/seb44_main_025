import { Outlet } from 'react-router-dom';
import Artist from './components/artist';
import Artistcontainer from './components/artistcontainer';

function App() {
  return (
    <div className="App">
      <Outlet />
      <Artist />
      <Artistcontainer />
    </div>
  );
}

export default App;
