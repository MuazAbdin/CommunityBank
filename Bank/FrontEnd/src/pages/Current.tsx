import { useOutletContext } from "react-router-dom";
import Table from "../components/Table";
import Transaction from "../components/Transaction";
import { TransactionDetails } from "../types/components";
import StyledSearchBar from "../assets/stylingWrappers/SearchBar";

function Current() {
  const { transactions } = useOutletContext() as {
    transactions: TransactionDetails[];
  };

  return (
    <section className="account-subsection-container">
      <StyledSearchBar pagesCount={1} currentPage={1} />
      <Table
        tableCaption="Transactions"
        tableHeader={["", "Date", "Account", "Category", "Amount"]}
      >
        {transactions.map((t) => {
          const targetAccount =
            t.tag === "sent"
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
