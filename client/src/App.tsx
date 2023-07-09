import { Outlet } from 'react-router-dom';
import CarouselLogic from './components/Carousel/CarouselLogic';
import MainPageButton from './components/Buttons/MainPageButton';

function App() {
  return (
    <div className="App">
      <CarouselLogic />
      <MainPageButton />
      <Outlet />
    </div>
  );
}

export default App;
