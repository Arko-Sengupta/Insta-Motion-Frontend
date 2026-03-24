import { FaInstagram } from "react-icons/fa";
import StaticData from "../Data/StaticData.json";
import "../Styles/Loader.css";

const { App: AppText } = StaticData;

const Loader = () => (
  <div className="loader">
    <div className="loader__spinner">
      <FaInstagram className="loader__icon" />
    </div>
    <p className="loader__text">{AppText.LoadingMessage}</p>
  </div>
);

export default Loader;
