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

export async function loader() {
  // const response = await fetcher("/v1/accounts");
  // if (!response.ok) throw response;
  // const { user, accounts } = (await response.json()) as {
  //   user: UserDetails;
  //   accounts: AccountDetails[];
  // };
  // return { user, accounts };
}
