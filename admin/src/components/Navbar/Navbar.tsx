import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <img
        className="logo"
        src={assets.logo.src}
        alt="Logo"
      />

      <img
        className="profile"
        src={assets.profile_image.src}
        alt="Profile"
      />
    </div>
  );
};

export default Navbar;