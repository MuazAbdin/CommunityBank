import { Link } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/MainHeader.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Logo from "./Logo.tsx";
import { faMoon } from "@fortawesome/free-solid-svg-icons/faMoon";

function MainHeader() {
  return (
    <Wrapper>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <menu>
          <li>
            <FontAwesomeIcon icon={faLocationDot} />
            <Link to="/">Branches</Link>
          </li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            <Link to="/">Contact Us</Link>
          </li>
          <li className="mode-btn">
            <FontAwesomeIcon icon={faMoon} />
          </li>
        </menu>
      </nav>
    </Wrapper>
  );
}

export default MainHeader;
