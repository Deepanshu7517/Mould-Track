import subrosLogo from "../../assets/subrosLogo.jpg";
import iotelligenceLogo from '../../assets/LOGO.png'
import "../../app/globals.css";

const Navbar = () => {
console.log(location);
  return (
    <div className="navbar">
      
      <img src={subrosLogo} alt="ongcLogo" className="" />
      <img src={iotelligenceLogo} alt="assamAirLogo" className="" />
    </div>
  );
};

export default Navbar;
