import { useNavigate, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/LoanCalculations";
import { ILoanCalculations } from "../pages/Loan";
import { LOAN_FIELDS } from "../utils/constants";
import Arrow from "./Arrow";
import HiddenForm from "./HiddenForm";
import PieChart from "./PieChart";
import { fetcher } from "../utils/fetcher";
import { HTTPError } from "../utils/cutomErrors";
import { toast } from "react-toastify";
import { AccountDetails } from "../types/components";
import { FormEvent } from "react";
import { validateLoanFields } from "../utils/validation";

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
  const { account } = useOutletContext() as { account: AccountDetails };

  async function handleAgree(event: FormEvent<HTMLButtonElement>) {
    event.preventDefault();

    const fd = new FormData(event.currentTarget.form!);
    const data = Object.fromEntries(fd.entries());
    console.log(data);
    const preSubmitValidation = validateLoanFields(data);
    console.log(preSubmitValidation);
    if (preSubmitValidation.msg === "Invalid inputs")
      throw new Error("loan values are not correct");

    try {
      const response = await fetcher(`loans/${account.number.slice(-6)}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new HTTPError(response);
      toast.success("Loan granted successfully");
      return navigate("../browse");
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
        <button className="btn" onClick={handleAgree}>
          agree
        </button>
      </HiddenForm>
    </Wrapper>
  );
}

export default LoanCalculations;
