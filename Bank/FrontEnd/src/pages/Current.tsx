import { useOutletContext } from "react-router-dom";
import StyledSearch from "../assets/stylingWrappers/Search";
import Table from "../components/Table";
import Transaction from "../components/Transaction";
import { TransactionDetails } from "../types/components";

function Current() {
  const { transactions } = useOutletContext() as {
    transactions: TransactionDetails[];
  };
  return (
    <section className="account-subsection-container">
      <StyledSearch />
      <Table
        tableCaption="Transactions"
        tableHeader={["", "Date", "Vendor", "Category", "Amount"]}
      >
        {transactions.map((t) => (
          <Transaction key={t._id} {...t} />
        ))}
      </Table>
    </section>
  );
}

export default Current;
