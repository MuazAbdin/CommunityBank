import Table from "../components/Table";

function Breakdown() {
  return (
    <section className="account-subsection-container">
      <Table
        tableCaption="Transactions"
        tableHeader={["", "Category", "Amount"]}
      ></Table>
    </section>
  );
}

export default Breakdown;
