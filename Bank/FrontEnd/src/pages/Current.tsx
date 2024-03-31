import { useOutletContext } from "react-router-dom";
import { FaRegFilePdf } from "react-icons/fa6";
import Table from "../components/Table";
import Transaction from "../components/Transaction";
import { AccountDetails, TransactionDetails } from "../types/components";
import StyledSearchBar from "../assets/stylingWrappers/SearchBar";
import { fetcher } from "../utils/fetcher";
import { toast } from "react-toastify";
import { HTTPError } from "../utils/cutomErrors";

function Current() {
  const { account, transactions, pagesCount, page } = useOutletContext() as {
    account: AccountDetails;
    transactions: TransactionDetails[];
    pagesCount: number;
    page: number;
  };

  return (
    <section className="account-subsection-container">
      <StyledSearchBar
        key={account.number}
        pagesCount={pagesCount}
        currentPage={page}
      />
      <button
        className="btn pdf-btn"
        onClick={() => handleTransactionsPDF(account.number)}
      >
        <FaRegFilePdf />
      </button>
      <Table
        tableCaption="Transactions"
        tableHeader={["", "Date", "Account", "Category", "Amount"]}
      >
        {transactions.map((t) => {
          const targetAccount =
            t.tag === "payor"
              ? t.receiverAccount.number
              : t.senderAccount.number;
          return (
            <Transaction key={t._id} {...t} targetAccount={targetAccount} />
          );
        })}
      </Table>
    </section>
  );
}

export default Current;

const handleTransactionsPDF = async (accountNum: string) => {
  try {
    const response = await fetcher(`transactions/${accountNum.slice(5)}/pdf`);

    if (!response.ok) {
      if ([403, 404].includes(response.status)) {
        const responseData = await response.json();
        return toast.error(responseData.msg);
      }
      throw new HTTPError(response);
    }

    const blob = await response.blob();
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, "_blank");
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      throw error;
    }
    console.log(error);
    return error;
  }
};
