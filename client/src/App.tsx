import { Outlet } from 'react-router-dom';
import Concertpreview from './components/concertpreview';

function App() {
  return (
    <div className="App">
      <Outlet />
      <Concertpreview />
    </div>
  );
}

export default App;
