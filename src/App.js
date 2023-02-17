import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Home } from './Components/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { ProviderApp } from './Components/context';

function App() {
  const [accountAddress, setAccountAddress] = useState("");

  
  return (
    <div className="App">
      <Router>
    <Routes>
      <Route path='/' element={[<Header accountAddress={accountAddress} />,<Home setAccountAddress={setAccountAddress} accountAddress={accountAddress}/>,<Footer/>]} />
    </Routes>
  </Router>
    </div>
  );
}

export default App;
