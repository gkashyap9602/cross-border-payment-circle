import React from "react";
import { useProvider } from "./context";

export function Header(props) {
 
  const {accountAddress,accountBalance,WireAccountId,payoutId} = useProvider()
  
  let {isLogin} = props
  let result  = true
  // {console.log(accAddress,"accAddress")}
  // {console.log(result,"result")}
  let navStyle = {
    
    backgroundColor :"#9c83b7 !important" 
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light" style = {navStyle}>
    <div className="container-fluid">
      <a className="navbar-brand" href="http://localhost:3000">{"Cross Border Payment"}</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {/* <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="hello.com">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="hello">About</a>
          </li> */}
        
        </ul>
        {result? <form className="d-flex" role="search">
        {/* <span className="inline-block" >
                      <span style={{fontWeight:"bold",paddingRight:"10px"}}>  {"accBalance"} { "chainName" } </span>  <span>{"accAddress"}</span> 
                      </span> */}
                      {accountAddress?
           <span> <strong>Steller Account</strong>:- {accountAddress}   <span> <strong> Balance</strong> :- {accountBalance}</span></span>
           :
           
           ( WireAccountId? <span> <strong>Wire Account Id</strong>:- {WireAccountId}   </span>:
           <span> <strong>Wire Acc Id</strong>:- {payoutId}   </span>
           
           )
           
           }
         

           {/* <button id="connect-me-btn" onClick={props.SignInMetamask} className="btn btn-primary"  >Connect Me</button>  */}
           </form>: 
           <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Connect Wallet
</button>
             }
      </div>
    </div> 
  </nav>
  );
  // onClick={SignInMetamask}
}
