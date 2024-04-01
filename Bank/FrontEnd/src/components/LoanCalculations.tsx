import Wrapper from "../assets/stylingWrappers/LoanCalculations";
import { ILoanCalculations } from "../pages/Loan";
import { LOAN_FIELDS } from "../utils/constants";
import Arrow from "./Arrow";
import HiddenForm from "./HiddenForm";
import PieChart from "./PieChart";

function LoanCalculations({
  calculations,
}: {
  calculations: ILoanCalculations;
}) {
  return (
    <Wrapper>
      <Arrow />
      <PieChart calculations={calculations} />
      <HiddenForm
        fields={LOAN_FIELDS}
        values={{ amount: 100, term: 12, interestRate: 6 }}
      >
        <button className="btn">agree</button>
      </HiddenForm>
    </Wrapper>
  );
}

export default LoanCalculations;
