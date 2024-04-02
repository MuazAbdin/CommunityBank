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
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await fetcher("auth/logout");
      if (!response.ok) throw new HTTPError(response);
      toast.success("Logged out successfully");
      return navigate("/login");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      }
      console.log(error);
      return error;
    }
  }

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
