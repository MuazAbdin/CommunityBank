import { LoaderFunctionArgs } from "react-router-dom";
import Table from "../components/Table";
import { customLoader } from "../utils/customLoader";
import { AccountDetails, UserDetails, loanDetails } from "../types/components";

function LoansBrowser() {
  return (
    <section className="account-subsection-container">
      <Table
        tableCaption="Loans"
        tableHeader={[
          "",
          "Start Date",
          "Pay-off Date",
          "Amount",
          "Term",
          "Interest Rate",
        ]}
      ></Table>
    </section>
  );
}

export default LoansBrowser;

export async function loader({ params, request }: LoaderFunctionArgs) {
  const loaderData = await customLoader({
    params,
    request,
    url: `loans/${params.number}`,
    specialErrors: [400, 401],
  });

  const { user, account, loans } = loaderData as {
    user: UserDetails;
    account: AccountDetails;
    loans: loanDetails[];
  };

  return { user, account, loans };
}
