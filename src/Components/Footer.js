import React from "react";

export const Footer = () => {

  let footerStyle = {
    // position: "absolute",
    // top: "93.7vh",
    width: "100%",
    bottom:"0"
 
   }
  return (

    <footer className="bg-grey text-light py-1" style={footerStyle}  >
      <p className="text-center">
       Copyright &copy;
       </p>
    </footer>
  )
  
};
 