import { NavLink } from "react-router-dom";
import {
  FaChartPie,
  FaBuildingColumns,
  FaHandHoldingDollar,
  FaMoneyBillTransfer,
} from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/AccountNavBar";

function AccountNavBar() {
  return (
    <Wrapper>
      <menu>
        <li>
          <NavLink
            to=""
            end
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <FaBuildingColumns />
            <span>current</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="transfer"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <FaMoneyBillTransfer />
            <span>transfer</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="loan"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <FaHandHoldingDollar />
            <span>loan</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="breakdown"
            className={({ isActive }) => (isActive ? "active" : undefined)}
          >
            <FaChartPie />
            <span>breakdown</span>
          </NavLink>
        </li>
      </menu>
    </Wrapper>
  );
}

export default AccountNavBar;
