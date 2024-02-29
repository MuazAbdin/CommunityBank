import Table from "../components/Table";
import Transaction from "../components/Transaction";

const TRANSACTIONS = [
  {
    _id: "1234",
    createdAt: "2024-02-24T09:08:58.437+00:00",
    vendor: "elevation",
    category: "salary",
    amount: 1500,
  },
];

function Current() {
  return (
    <section className="account-subsection-container">
      <Table
        tableCaption="Transactions"
        tableHeader={["", "Date", "Vendor", "Category", "Amount"]}
      >
        {TRANSACTIONS.map((t) => (
          <Transaction key={t._id} {...t} />
        ))}
      </Table>
    </section>
  );
}

export default Current;
