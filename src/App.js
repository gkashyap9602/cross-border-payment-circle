import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Home } from './Components/Home';
import "bootstrap/dist/css/bootstrap.min.css"

import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { ProviderApp } from './Components/context';

function App() {
  return (
    <div className="App">
      <Router>
    <Routes>
      <Route path='/' element={[<Header/>,<Home/>,<Footer/>]} />
    </Routes>
  </Router>
    </div>
  );
}

export default App;
