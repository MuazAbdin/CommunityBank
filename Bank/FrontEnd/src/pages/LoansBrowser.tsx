import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import Table from "../components/Table";
import { customLoader } from "../utils/customLoader";
import { AccountDetails, UserDetails, loanDetails } from "../types/components";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import dayjs from "dayjs";
import { fetcher } from "../utils/fetcher";
import { toast } from "react-toastify";
import { HTTPError } from "../utils/cutomErrors";

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
          "Loan Balance",
          "Monthly Payment",
          "Next Payment",
          "Schedule",
        ]}
      >
        {loans.map((loan) => {
          let nextPayment = new Date(loan.createdAt);
          nextPayment.setMonth(nextPayment.getMonth() + loan.nextPayment + 1);

          return (
            <tr key={loan._id}>
              <td>{loan.balnce.toFixed(2)} ₪</td>
              <td>{loan.monthlyPayment.toFixed(2)} ₪</td>
              <td>{dayjs(nextPayment).format("MMMM  YYYY")}</td>
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

async function handleLoanPDF(loadId: string) {
  try {
    const response = await fetcher(`loans/pdf/${loadId}`);

    if (!response.ok) {
      if ([403, 404].includes(response.status)) {
        const responseData = await response.json();
        return toast.error(responseData.msg);
      }
      throw new HTTPError(response);
    }

    const blob = await response.blob();
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, "_blank");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      throw error;
    }
    console.log(error);
    return error;
  }
}
