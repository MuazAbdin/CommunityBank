import { useOutletContext } from "react-router-dom";
import Table from "../components/Table";
import Transaction from "../components/Transaction";
import { AccountDetails, TransactionDetails } from "../types/components";
import StyledSearchBar from "../assets/stylingWrappers/SearchBar";

function Current() {
  const { account, transactions, pagesCount, page } = useOutletContext() as {
    account: AccountDetails;
    transactions: TransactionDetails[];
    pagesCount: number;
    page: number;
  };

  return (
    <section className="account-subsection-container">
      <StyledSearchBar
        key={account.number}
        pagesCount={pagesCount}
        currentPage={page}
      />
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
