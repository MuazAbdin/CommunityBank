import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Account";
import AccountNavBar from "../components/AccountNavBar";
import AccountHeader from "../components/AccountHeader";
import { fetcher } from "../utils/fetcher";
import {
  AccountDetails,
  TransactionDetails,
  UserDetails,
} from "../types/components";

function Account() {
  const { user, account, transactions } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;

  return (
    <Wrapper>
      <AccountHeader number={account.number} balance={account.balance} />
      <AccountNavBar />
      <Outlet context={{ transactions }} />
    </Wrapper>
  );
}

export default Account;

export async function loader({ params }: LoaderFunctionArgs) {
  const response = await fetcher(`transactions/${params.number}`);
  if (!response.ok) throw response;
  const { user, account, transactions } = (await response.json()) as {
    user: UserDetails;
    account: AccountDetails;
    transactions: TransactionDetails[];
  };
  return { user, account, transactions };
}
