import { Outlet, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/DashboardLayout";
import Aside from "../components/Aside";
import PageHeader from "../components/PageHeader";
import { fetcher } from "../utils/fetcher";
import { AccountDetails, UserDetails } from "../types/components";
import { HTTPError } from "../utils/cutomErrors";
import { toast } from "react-toastify";

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

export async function loader() {
  try {
    const response = await fetcher("accounts");
    if (!response.ok) throw new HTTPError(response);
    const responseData = await response.json();
    return responseData as {
      user: UserDetails;
      accounts: AccountDetails[];
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
    console.log(error);
    throw error;
  }
}
