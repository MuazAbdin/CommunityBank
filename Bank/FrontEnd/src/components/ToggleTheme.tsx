import { BsSunFill, BsMoonFill } from "react-icons/bs";
import Wrapper from "../assets/stylingWrappers/ToggleTheme";
import { IMainHeaderProps } from "../types/components";

function ToggleTheme({ isDark, themeToggle }: IMainHeaderProps) {
  return (
    <Wrapper onClick={themeToggle}>
      {isDark ? (
        <BsSunFill className="toggle-icon" />
      ) : (
        <BsMoonFill className="toggle-icon" />
      )}
    </Wrapper>
  );
}

export default ToggleTheme;
