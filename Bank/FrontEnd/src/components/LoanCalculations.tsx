import Wrapper from "../assets/stylingWrappers/LoanCalculations";
import { ILoanCalculations } from "../pages/Loan";
import { LOAN_FIELDS } from "../utils/constants";
import Arrow from "./Arrow";
import HiddenForm from "./HiddenForm";
import PieChart from "./PieChart";

function LoanCalculations({
  calculations,
  amount,
  term,
  interestRate,
}: {
  calculations: ILoanCalculations;
  amount: number;
  term: number;
  interestRate: number;
}) {
  return (
    <Wrapper>
      <Arrow />
      <PieChart calculations={calculations} />
      <HiddenForm fields={LOAN_FIELDS} values={{ amount, term, interestRate }}>
        <button className="btn">agree</button>
      </HiddenForm>
    </Wrapper>
  );
}

export default LoanCalculations;
