import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">

        <div className="footer-content-left">
          <img
            src={assets.logo.src}
            alt="TechStore Logo"
          />

          <p>
            Your trusted destination for smartphones,
            laptops, gaming accessories, smart devices,
            and premium electronics at unbeatable prices.
          </p>

          <div className="footer-social-icon">
            <img
              src={assets.facebook_icon.src}
              alt="Facebook"
            />

            <img
              src={assets.twitter_icon.src}
              alt="Twitter"
            />

            <img
              src={assets.linkedin_icon.src}
              alt="LinkedIn"
            />
          </div>
        </div>

        <div className="footer-content-center">
          <h2>SHOP</h2>

          <ul>
            <li>Smartphones</li>
            <li>Laptops</li>
            <li>Headphones</li>
            <li>Smart Watches</li>
            <li>Gaming Accessories</li>
          </ul>
        </div>

        <div className="footer-content-center">
          <h2>COMPANY</h2>

          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        <div className="footer-content-right">
          <h2>CONTACT</h2>

          <ul>
            <li>📞 +91-8294935408</li>
            <li>📧 ajeetkumar4035@gmail.com</li>
            <li>📍 Kochi, Kerala, India</li>
          </ul>
        </div>

      </div>

      <hr />

      <p className="footer-copyright">
        © 2026 TechStore. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;