import { Outlet } from 'react-router-dom';
import Artist from './components/artist';
import Artistcontainer from './components/artistcontainer';
import Artistmain from './components/artistmain';
import ArtistreviewContainer from './components/artistreviewcontainer';
import Artistreview from './components/artistreview';

function App() {
  return (
    <div className="App">
      <Outlet />
      <Artist />
      <Artistreview />
      <Artistcontainer />
      <Artistmain />
      <ArtistreviewContainer />
    </div>
  );
}

export default App;
