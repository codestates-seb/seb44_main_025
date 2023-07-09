import { Outlet } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <Main />
      <Outlet />
    </div>
  );
}

export default App;
