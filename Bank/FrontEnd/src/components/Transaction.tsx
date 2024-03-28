import { ITransactionProps } from "../types/components";

function getDate(date: Date): string {
  const month = date.getUTCMonth() + 1; // months from 1-12
  const day = date.getUTCDate();
  return `${day}/${month}`;
}

function Transaction(props: ITransactionProps) {
  const { amount, receiverAccount, vendor, category, date } = props;
  const amountStyle: string = amount < 0 ? "red" : "green";

  return (
    <tr>
      <td>{getDate(new Date(date))}</td>
      <td>{receiverAccount}</td>
      <td>{vendor}</td>
      <td>{category}</td>
      <td
        style={{
          backgroundColor: `var(--${amountStyle}-light)`,
          color: `var(--${amountStyle}-dark)`,
          fontWeight: 600,
        }}
      >
        ₪ {amount}
      </td>
    </tr>
  );
}

export default Transaction;
