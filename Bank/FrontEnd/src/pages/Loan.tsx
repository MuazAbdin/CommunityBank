import StyledLoanForm from "../assets/stylingWrappers/StyledLoanForm";
import LoanCalculations from "../components/LoanCalculations";

function Loan() {
  return (
    <section className="account-subsection-container">
      <StyledLoanForm />
      <LoanCalculations />
    </section>
  );
}

export default Loan;
