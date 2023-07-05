import { Outlet } from 'react-router-dom';
import Artist from './components/artist';
import Artistcontainer from './components/artistcontainer';
import Artistmain from './components/artistmain';

function App() {
  return (
    <div className="App">
      <Outlet />
      <Artist />
      <Artistcontainer />
      <Artistmain />
    </div>
  );
}

export default App;
