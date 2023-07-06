import { Outlet } from 'react-router-dom';
import CarouselLogic from './components/Carousel/CarouselLogic';
import Mypage from './pages/mypage';

function App() {
  return (
    <div className="App">
      <CarouselLogic />
      <Outlet />
      <Mypage />
    </div>
  );
}

export default App;
