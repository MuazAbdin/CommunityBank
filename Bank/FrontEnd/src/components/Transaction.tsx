import { ITransactionProps } from "../interfaces/components";

function getDate(date: Date): string {
  const month = date.getUTCMonth() + 1; // months from 1-12
  const day = date.getUTCDate();
  return `${day}/${month}`;
}

function Transaction(props: ITransactionProps) {
  const { _id, createdAt, vendor, category, amount } = props;
  const amountStyle: string = amount < 0 ? "red" : "green";

  return (
    <tr>
      <td>{getDate(new Date(createdAt))}</td>
      <td>{vendor}</td>
      <td>{category}</td>
      <td
        style={{
          color: `var(--${amountStyle}-dark)`,
          fontWeight: 600,
        }}
      >
        ${amount}
      </td>
    </tr>
  );
}

export default Transaction;
