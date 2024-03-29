import { useOutletContext } from "react-router-dom";
import Table from "../components/Table";
import Transaction from "../components/Transaction";
import { TransactionDetails } from "../types/components";
import StyledSearchBar from "../assets/stylingWrappers/SearchBar";

function Current() {
  const { transactions, pagesCount, page } = useOutletContext() as {
    transactions: TransactionDetails[];
    pagesCount: number;
    page: number;
  };

  return (
    <section className="account-subsection-container">
      <StyledSearchBar pagesCount={pagesCount} currentPage={page} />
      <Table
        tableCaption="Transactions"
        tableHeader={["", "Date", "Account", "Category", "Amount"]}
      >
        {transactions.map((t) => {
          const targetAccount =
            t.tag === "payor"
              ? t.receiverAccount.number
              : t.senderAccount.number;
          return (
            <Transaction key={t._id} {...t} targetAccount={targetAccount} />
          );
        })}
      </Table>
    </section>
  );
}

export default Current;

// export async function loader({ params, request }: LoaderFunctionArgs) {
//   const url = new URL(request.url);
//   const searchParams = getURLSearchParams(url);
//   // console.log(searchParams);
//   // return null;
//   const loaderData = await customLoader({
//     params,
//     request,
//     url: "",
//     specialErrors: [],
//   });
//   return { page: searchParams.page, ...loaderData };
// }

// interface ISearchQuery {
//   query?: string;
//   side?: string[];
//   type?: string[];
//   category?: string[];
//   start?: string;
//   end?: string;
//   page?: string;
// }

// function getURLSearchParams(url: URL) {
//   const searchQuery: ISearchQuery = {};

//   const query = url.searchParams.get("query") || "";
//   if (query.trim() !== "") searchQuery.query = query;

//   const side = url.searchParams.getAll("side");
//   if (side.length > 0 && side[0] !== "") searchQuery.side = side;

//   const type = url.searchParams.getAll("type");
//   if (type.length > 0 && type[0] !== "") searchQuery.type = type;

//   const category = url.searchParams.getAll("category");
//   if (category.length > 0 && category[0] !== "")
//     searchQuery.category = category;

//   const page = url.searchParams.get("page") || "1";
//   searchQuery.page = page;

//   const start = url.searchParams.get("start") || "";
//   if (start.trim() !== "") searchQuery.start = start;

//   const end = url.searchParams.get("end") || "";
//   if (end.trim() !== "") searchQuery.end = end;

//   // @ts-ignore
//   return searchQuery;
//   // return new URLSearchParams(searchQuery);
// }
