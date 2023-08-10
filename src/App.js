import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PokeHeader from './components/PokeHeader/PokeHeader';
import Homepage from './pages/Homepage/Homepage';
import PokePage from './pages/PokePage/PokePage';


function App() {
  return (
    <>
      <Router>
        <PokeHeader />
        <Routes>
          <Route exact path='/' Component={Homepage} />
          <Route path='/pokemon/:id' Component={PokePage} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
