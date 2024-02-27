import { Outlet } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Account";
import AccountNavBar from "../components/AccountNavBar";
import AccountHeader from "../components/AccountHeader";

function Account() {
  return (
    <Wrapper>
      <AccountHeader />
      <AccountNavBar />
      <Outlet />
    </Wrapper>
  );
}

export default Account;
