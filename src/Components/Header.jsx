import { FaInstagram } from "react-icons/fa";
import "../Styles/Header.css";

const Header = ({ Title }) => (
  <div className="header">
    <FaInstagram className="header__icon" />
    <h1 className="header__title">{Title}</h1>
  </div>
);

export default Header;
