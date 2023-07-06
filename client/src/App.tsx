import { Outlet } from 'react-router-dom';
import Review from './components/review/review';

function App() {
  return (
    <div className="App">
      <Outlet />
      <Review />
    </div>
  );
}

export default App;
