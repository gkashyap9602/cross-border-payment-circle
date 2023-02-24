import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Home } from './Components/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { ProviderApp } from './Components/context';
// import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

import { Payout } from './Components/Payout';
import {WirePayment} from "./Components/WirePayment"
import { StellerPayout } from './Components/stellerPayout';
import { HeaderSteller } from './Components/HeaderSteller';

function App() {

  // const [accountAddress, setAccountAddress] = useState("");

  
  return (
    <ProviderApp>
    <div className="App">
    {/* <ToastContainer  progressClassName="toastProgress" bodyClassName="toastBody"/> */}

      <Router>
    <Routes>
      <Route exact path='/' element={[<Header  />,<Home />,<Footer/>]} />
      <Route path='/wire' element={[<Header  />,<WirePayment />,<Footer/>]} />
      <Route path='/payout' element={[<Header  />,<Payout />,<Footer/>]} />
      <Route path='/stellerPayout' element={[<HeaderSteller  />,<StellerPayout />,<Footer/>]} />



    </Routes>
  </Router>
    </div>
    </ProviderApp>
  );
}

export default App;
