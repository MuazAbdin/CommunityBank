export function amortizedSchedule(
  loanAmount: number,
  loanTerm: number,
  interestRate: number,
  compoundings: number = 12
) {
  const r = interestRate / (100 * compoundings);
  const n = loanTerm * compoundings;
  // const factor = Math.pow(1 + r, n);
  // const totalRepayment = (loanAmount * r * factor) / (factor - 1);
  const factor = r / (1 - Math.pow(1 + r, -n));
  const totalRepayment = loanAmount * factor;

  const schedule = [];
  let balance = loanAmount;
  for (let k = 1; k <= n; k++) {
    const interestRepayment = balance * r;
    const principalRepayment = totalRepayment - interestRepayment;
    balance -= principalRepayment;
    schedule.push({
      month: k,
      payment: parseFloat(totalRepayment.toFixed(2)),
      interest: parseFloat(interestRepayment.toFixed(2)),
      principal: parseFloat(principalRepayment.toFixed(2)),
      balance: Math.abs(parseFloat(balance.toFixed(2))),
    });
  }
  schedule.push({
    month: "",
    payment: parseFloat(
      schedule.reduce((acc, row) => acc + row.payment, 0).toFixed(2)
    ),
    interest: parseFloat(
      schedule.reduce((acc, row) => acc + row.interest, 0).toFixed(2)
    ),
    principal: parseFloat(
      schedule.reduce((acc, row) => acc + row.principal, 0).toFixed(2)
    ),
    balance: "",
  });

  return schedule;
}
