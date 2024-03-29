import { LoaderFunctionArgs, Outlet, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Account";
import AccountNavBar from "../components/AccountNavBar";
import AccountHeader from "../components/AccountHeader";
import {
  AccountDetails,
  TransactionDetails,
  UserDetails,
} from "../types/components";
import { customLoader } from "../utils/customLoader";

function Account() {
  const { user, account, transactions, pagesCount, page } =
    useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <Wrapper>
      <AccountHeader number={account.number} balance={account.balance} />
      <AccountNavBar />
      <Outlet context={{ transactions, pagesCount, page }} />
    </Wrapper>
  );
}

export default Account;

export async function loader({ params, request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = getURLSearchParams(url);
  console.log(searchParams);
  // return null;
  const loaderData = await customLoader({
    params,
    request,
    url: `transactions/${params.number}?${new URLSearchParams(searchParams)}`,
    specialErrors: [400, 401],
  });

  const { user, account, transactions, pagesCount } = loaderData as {
    user: UserDetails;
    account: AccountDetails;
    transactions: TransactionDetails[];
    pagesCount: number;
  };

  return {
    user,
    account,
    transactions,
    pagesCount,
    page: parseInt(searchParams.page || "1"),
  };
}

interface ISearchQuery {
  query?: string;
  side?: string[];
  type?: string[];
  category?: string[];
  start?: string;
  end?: string;
  page?: string;
}

function getURLSearchParams(url: URL) {
  const searchQuery: ISearchQuery = {};

  const query = url.searchParams.get("query") || "";
  if (query.trim() !== "") searchQuery.query = query;

  const side = url.searchParams.getAll("side");
  if (side.length > 0 && side[0] !== "") searchQuery.side = side;

  const type = url.searchParams.getAll("type");
  if (type.length > 0 && type[0] !== "") searchQuery.type = type;

  const category = url.searchParams.getAll("category");
  if (category.length > 0 && category[0] !== "")
    searchQuery.category = category;

  const page = url.searchParams.get("page") || "1";
  searchQuery.page = page;

  const start = url.searchParams.get("start") || "";
  if (start.trim() !== "") searchQuery.start = start;

  const end = url.searchParams.get("end") || "";
  if (end.trim() !== "") searchQuery.end = end;

  // @ts-ignore
  return searchQuery;
  // return new URLSearchParams(searchQuery);
}

// export async function loader({ params }: LoaderFunctionArgs) {
//   const response = await fetcher(`transactions/${params.number}`);
//   if (!response.ok) throw response;
//   const { user, account, transactions } = (await response.json()) as {
//     user: UserDetails;
//     account: AccountDetails;
//     transactions: TransactionDetails[];
//   };
//   return { user, account, transactions };
// }
