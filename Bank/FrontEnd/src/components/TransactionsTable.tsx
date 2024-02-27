import Transaction from "./Transaction";
import Wrapper from "../assets/stylingWrappers/TransactionsTable.ts";

function TransactionsTable({ transactions }) {
  return (
    <Wrapper>
      <caption>Transactions</caption>
      <thead
        className="table-head"
        style={{ backgroundColor: "var(--yellow-light)" }}
      >
        <tr>
          <th></th>
          <th>Date</th>
          <th>Vendor</th>
          <th>Category</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((t) => (
          <Transaction key={t._id} {...t} />
        ))}
      </tbody>
    </Wrapper>
  );
}

export default TransactionsTable;