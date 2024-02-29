import Wrapper from "../assets/stylingWrappers/PieChart";

function PieChart() {
  return (
    <Wrapper>
      <div className="calc-piechart">
        <div className="total-amount">
          Total Paid: <strong>₪ 5000</strong>
        </div>
      </div>
      <div className="calc-legend">
        <span className="calc-legend__item">
          monthly payment: <strong className="payment">₪ 450</strong>
        </span>
        <span className="calc-legend__item">
          total interest paid: <strong className="interest">₪ 450</strong>
        </span>
        <span className="calc-legend__item">
          loan amount: <strong className="loan">₪ 450</strong>
        </span>
      </div>
      <button className="btn">agree</button>
    </Wrapper>
  );
}

export default PieChart;
