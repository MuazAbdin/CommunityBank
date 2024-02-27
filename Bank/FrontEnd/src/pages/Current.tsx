import TransactionsTable from "../components/TransactionsTable";

const TRANSACTIONS = [
  {
    _id: "1234",
    createdAt: "2024-02-24T09:08:58.437+00:00",
    vendor: "elevation",
    category: "salary",
    amount: "1500",
  },
];

function Current() {
  return (
    <section className="account-subsection-container">
      <TransactionsTable transactions={TRANSACTIONS} />
    </section>
  );
}

export default Current;
