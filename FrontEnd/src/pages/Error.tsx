import { useState } from "react";
import { useRouteError } from "react-router-dom";
import { HTTPError } from "../utils/cutomErrors";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import { FaTriangleExclamation } from "react-icons/fa6";
import { ToastContainer } from "react-toastify";
import Wrapper from "../assets/stylingWrappers/Error";

function Error() {
  const [isDark, setIsDark] = useState(getTheme());

  function themeToggle() {
    setIsDark((prevState) => !prevState);
    localStorage.setItem("darkTheme", String(!isDark));
  }
  const error = useRouteError() as HTTPError;
  console.log(error);

  return (
    <div id="app-container" className={isDark ? "dark-theme" : ""}>
      <ToastContainer position="bottom-left" />
      <MainHeader isDark={isDark} themeToggle={themeToggle} />
      <Wrapper>
        <div>
          <FaTriangleExclamation />
          <div className="error-header">
            <h1>{error.status}</h1>
            <span>{error.message ?? error.statusText}</span>
          </div>
          <p className="error-data">{error.data ?? ""}</p>
        </div>
      </Wrapper>
      <MainFooter />
    </div>
  );
}

export default Error;

function getTheme() {
  const isDark = localStorage.getItem("darkTheme") === "true";
  return isDark;
}
