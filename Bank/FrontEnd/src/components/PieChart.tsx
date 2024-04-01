import Wrapper from "../assets/stylingWrappers/PieChart";
import { ILoanCalculations } from "../pages/Loan";

function PieChart({ calculations }: { calculations: ILoanCalculations }) {
  return (
    <Wrapper>
      <div className="calc-piechart">
        <div className="total-amount">
          Total Paid: <strong>₪ {formatAmount(calculations.totalPaid)}</strong>
        </div>
      </div>
      <div className="calc-legend">
        <span className="calc-legend__item">
          monthly payment:{" "}
          <strong className="payment">
            ₪ {formatAmount(calculations.monthlyPayment)}
          </strong>
        </span>
        <span className="calc-legend__item">
          total interest paid:{" "}
          <strong className="interest">
            ₪ {formatAmount(calculations.totalInterestPaid)}
          </strong>
        </span>
        <span className="calc-legend__item">
          loan amount:{" "}
          <strong className="loan">
            ₪ {formatAmount(calculations.loanAmount)}
          </strong>
        </span>
      </div>
    </Wrapper>
  );
}

export default PieChart;

function formatAmount(value: number) {
  const stringValue = String(value).split(".");
  const n = stringValue[0].length;
  let e = n;
  let s = 0;
  let res = "";
  while (-1 * s < n) {
    s -= 3;
    res = "," + stringValue[0].slice(s, e) + res;
    e = s;
  }
  return res.slice(1) + (stringValue[1] ? `.${stringValue[1]}` : "");
}
