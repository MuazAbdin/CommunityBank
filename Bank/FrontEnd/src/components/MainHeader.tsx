import { Link } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/MainHeader.ts";
import { FaLocationDot, FaEnvelope } from "react-icons/fa6";
import Logo from "./Logo.tsx";
import ToggleTheme from "./ToggleTheme.tsx";
import { IMainHeaderProps } from "../types/components.ts";

function MainHeader({ isDark, themeToggle }: IMainHeaderProps) {
  return (
    <Wrapper>
      <Link to="/">
        <Logo />
      </Link>
      <nav>
        <menu>
          <li>
            <FaLocationDot />
            <Link to="/">Branches</Link>
          </li>
          <li>
            <FaEnvelope />
            <Link to="/">Contact Us</Link>
          </li>
          <li className="theme-btn">
            <ToggleTheme isDark={isDark} themeToggle={themeToggle} />
          </li>
        </menu>
      </nav>
    </Wrapper>
  );
}

export default MainHeader;
