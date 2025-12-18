import ongcLogo from "../../assets/ONGC-Logo.png";
import assamAirLogo from '../../assets/assamAirProductsLogo.png'
import "../../app/globals.css";

const Navbar = () => {
console.log(location);
  return (
    <div className="navbar">
      
      <img src={ongcLogo} alt="ongcLogo" className="" />
      <img src={assamAirLogo} alt="assamAirLogo" className="" />
    </div>
  );
};

export default Navbar;
