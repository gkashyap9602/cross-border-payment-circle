import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Home } from './Components/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { ProviderApp } from './Components/context';

import {WirePayment} from "./Components/WirePayment"

function App() {

  // const [accountAddress, setAccountAddress] = useState("");

  
  return (
    <ProviderApp>
    <div className="App">
      <Router>
    <Routes>
      <Route exact path='/' element={[<Header  />,<Home />,<Footer/>]} />
      <Route path='/wire' element={[<Header  />,<WirePayment />,<Footer/>]} />

    </Routes>
  </Router>
    </div>
    </ProviderApp>
  );
}

export default App;
