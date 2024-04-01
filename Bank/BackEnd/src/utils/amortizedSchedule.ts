export function amortizedSchedule(
  loanAmount: number,
  loanTerm: number,
  interestRate: number,
  compoundings: number = 12
) {
  const r = interestRate / (100 * compoundings);
  const n = loanTerm * compoundings;
  // const factor = r !== 0 ? Math.pow(1 + r, n) : 1 / n;
  // const totalRepayment = (loanAmount * r * factor) / (factor - 1);
  const factor = r !== 0 ? r / (1 - Math.pow(1 + r, -n)) : 1 / n;
  const monthlyRepayment = loanAmount * factor;

  const schedule = [];
  let balance = loanAmount;
  for (let k = 1; k <= n; k++) {
    const interestRepayment = balance * r;
    const principalRepayment = monthlyRepayment - interestRepayment;
    balance -= principalRepayment;
    schedule.push({
      month: k,
      payment: parseFloat(monthlyRepayment.toFixed(2)),
      interest: parseFloat(interestRepayment.toFixed(2)),
      principal: parseFloat(principalRepayment.toFixed(2)),
      balance: Math.abs(parseFloat(balance.toFixed(2))),
    });
  }
  schedule.push({
    month: "",
    payment: Math.round(
      parseFloat(schedule.reduce((acc, row) => acc + row.payment, 0).toFixed(2))
    ),
    interest: parseFloat(
      schedule.reduce((acc, row) => acc + row.interest, 0).toFixed(2)
    ),
    principal: Math.round(
      parseFloat(
        schedule.reduce((acc, row) => acc + row.principal, 0).toFixed(2)
      )
    ),
    balance: "",
  });

  return schedule;
}
