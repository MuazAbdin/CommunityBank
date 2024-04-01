import { ActionFunctionArgs, useActionData } from "react-router-dom";
import StyledLoanForm from "../assets/stylingWrappers/StyledLoanForm";
import LoanCalculations from "../components/LoanCalculations";
import { customAction } from "../utils/customAction";
import { validateLoanFields } from "../utils/validation";

export interface ILoanCalculations {
  monthlyPayment: number;
  totalInterestPaid: number;
  loanAmount: number;
  totalPaid: number;
}

function Loan() {
  const actionData = useActionData() as {
    calculations: ILoanCalculations;
  };
  return (
    <section className="account-subsection-container">
      <StyledLoanForm />
      {actionData?.calculations && (
        <LoanCalculations calculations={actionData?.calculations} />
      )}
    </section>
  );
}

export default Loan;

export async function action({ params, request }: ActionFunctionArgs) {
  return customAction({
    params,
    request,
    url: "loans/calculate",
    successMessage: "Calculated successfully",
    redirectPath: "",
    preSubmitValidator: validateLoanFields,
    specialErrors: [400, 401], // BadRequestError (invalid inputs), Forbidden
    returnDataOnSuccess: true,
  });
}
