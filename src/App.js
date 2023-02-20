import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Home } from './Components/Home';
import "bootstrap/dist/css/bootstrap.min.css"
import { useState } from 'react';
import { Header } from './Components/Header';
import { Footer } from './Components/Footer';
import { ProviderApp } from './Components/context';
// import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {

  // const [accountAddress, setAccountAddress] = useState("");

  
  return (
    <ProviderApp>
    <div className="App">
    {/* <ToastContainer  progressClassName="toastProgress" bodyClassName="toastBody"/> */}

      <Router>
    <Routes>
      <Route path='/' element={[<Header  />,<Home />,<Footer/>]} />
    </Routes>
  </Router>
    </div>
    </ProviderApp>
  );
}

export default App;
