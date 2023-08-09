import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PokeHeader from './components/PokeHeader/PokeHeader';
import Homepage from './pages/Homepage/Homepage';


function App() {
  return (
    <>
      <PokeHeader />
      <Router>
        <Homepage>
          <Route exact path='/' Component={Homepage} />
        </Homepage>
      </Router>
    </>
  );
}

export default App;
