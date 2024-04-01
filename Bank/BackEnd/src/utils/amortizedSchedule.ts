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
      payment: totalRepayment,
      interest: interestRepayment,
      principal: principalRepayment,
      balance: Math.max(balance, 0),
    });
  }
  schedule.push({
    month: "",
    payment: schedule.reduce((acc, row) => acc + row.payment, 0),
    interest: schedule.reduce((acc, row) => acc + row.interest, 0),
    principal: schedule.reduce((acc, row) => acc + row.principal, 0),
    balance: "",
  });

  return schedule;
}
