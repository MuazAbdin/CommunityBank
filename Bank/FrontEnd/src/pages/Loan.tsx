import { ActionFunctionArgs } from "react-router-dom";
import StyledLoanForm from "../assets/stylingWrappers/StyledLoanForm";
import LoanCalculations from "../components/LoanCalculations";
import { customAction } from "../utils/customAction";
import { validateLoanFields } from "../utils/validation";
import StyledTransferForm from "../assets/stylingWrappers/StyledTransferForm";

function Loan() {
  return (
    <section className="account-subsection-container">
      <StyledLoanForm />
      {/* <LoanCalculations /> */}
    </section>
  );
}

export default Loan;

export async function action({ params, request }: ActionFunctionArgs) {
  return customAction({
    params,
    request,
    // url: `loans/${params.number}`,
    url: "",
    successMessage: "Transfered successfully",
    redirectPath: "..",
    preSubmitValidator: validateLoanFields,
    specialErrors: [400, 401], // BadRequestError (invalid inputs), Forbidden
  });
}
