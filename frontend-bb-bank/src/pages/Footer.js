import { NavLink } from "react-router-dom";
import GreenMark from '../images/GreenMark.svg';
import { useState } from "react";
import style from "../styles/footer.css"
const Footer = ()=>{
return (
<div className="footercontainer">
  <footer style={{backgroundColor: "#eee6d3", borderRadius:"10px"}}>
    <div className="container p-2">
    <img className="img-fluid" src={GreenMark} width={60} height={40} alt="LogoMissing"/>
      <div className="row">
        <div className="col-lg-6 col-md-12 mb-4">
          <h4 className="mb-3 text-dark">B&B</h4>
          <p>
            B&B Bank:community wealth store. Add droplets of money to your savings account; to shape path for financial freedom in the future. Start saving today...     
          </p>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <h5 className="mb-1 text-dark">Visit our Office</h5>
          <table className="table" style={{borderColor: "#666"}}>
            <tbody>
              <tr>
                <td>Mon - Fri:</td>
                <td>8am - 9pm</td>
              </tr>
              <tr>
                <td>Sat - Sun:</td>
                <td>8am - 1pm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div className="text-center p-3" style={{backgroundColor: "green"}}>
    &copy;Copyright 2024, Bees Bank, Columbus, Ohio
    </div>
  </footer>
</div>
);   
}
export default Footer;