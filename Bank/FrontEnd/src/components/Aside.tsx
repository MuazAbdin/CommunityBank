import { FaFileInvoiceDollar, FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Aside";

function Aside() {
  return (
    <Wrapper>
      <nav>
        <menu>
          <NavLink
            to=""
            end
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <li>
              <FaRegCircleUser />
              <span>overview</span>
            </li>
          </NavLink>
          <NavLink
            to="accounts"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <li>
              <FaFileInvoiceDollar />
              <span>accounts</span>
            </li>
          </NavLink>
        </menu>
      </nav>
    </Wrapper>
  );
}

export default Aside;
