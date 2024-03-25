import { Outlet, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/DashboardLayout";
import Aside from "../components/Aside";
import PageHeader from "../components/PageHeader";
import { fetcher } from "../utils/fetcher";
import { AccountDetails, UserDetails } from "../types/components";

function DashboardLayout() {
  const { user, accounts } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
  const userValues = {
    IDcard: user.IDcard,
    firstName: user.name.first,
    lastName: user.name.last,
    email: user.email,
    mobile: user.mobile,
    city: user.address.city,
    street: user.address.street,
  };

  const accountsValues = accounts.map((acc) => {
    return {
      number: acc.number,
      type: acc.type,
      balance: acc.balance,
      lastVisit: acc.lastVisit,
    };
  });

  return (
    <Wrapper>
      <Aside accountsNums={accountsValues.map((acc) => acc.number)} />
      <PageHeader name={`${userValues.firstName} ${userValues.lastName}`} />
      <Outlet context={{ userValues, accountsValues }} />
    </Wrapper>
  );
}

export default DashboardLayout;

// in the back end made get current middleware before all routes
export async function loader() {
  // const response = await fetcher("/v1/users/current");
  const response = await fetcher("accounts");
  if (!response.ok) throw response;
  const { user, accounts } = (await response.json()) as {
    user: UserDetails;
    accounts: AccountDetails[];
  };
  return { user, accounts };
  // return json(response);
}
