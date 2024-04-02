import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { customLoader } from "../utils/customLoader";
import { AccountDetails, UserDetails, loanDetails } from "../types/components";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import dayjs from "dayjs";

function LoansBrowser() {
  const { user, account, loans } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >;
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
          "Interest",
          "",
        ]}
      >
        {loans.map((loan) => {
          return (
            <tr key={loan._id}>
              <td>{dayjs(loan.createdAt).format("MMMM YYYY")}</td>
              <td>{dayjs(loan.payOffDate).format("MMMM YYYY")}</td>
              <td>{loan.amount} ₪</td>
              <td>{loan.term} months</td>
              <td>{loan.interestRate} %</td>
              <td
                className="table-loanDetails-btn"
                onClick={() => handleLoanPDF(loan._id)}
              >
                <FaFileInvoiceDollar />
              </td>
            </tr>
          );
        })}
      </Table>
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

async function handleLoanPDF(loadId: string) {}
