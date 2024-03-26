import {
  ActionFunctionArgs,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Overview";
import StyledAccountForm from "../assets/stylingWrappers/StyledAccountForm";
import { AccountDetails, UserDetails } from "../types/components";
import Table from "../components/Table";
import { accountNumFormatter } from "../utils/inputFormatters";
import { FaFileLines, FaTrashCan } from "react-icons/fa6";
import { customAction } from "../utils/customAction";
import { fetcher } from "../utils/fetcher";
import { HTTPError } from "../utils/cutomErrors";
import { toast } from "react-toastify";

function Overview() {
  const { accountsValues } = useOutletContext() as {
    userValues: UserDetails;
    accountsValues: AccountDetails[];
  };

  const navigate = useNavigate();

  return (
    <section className="content">
      <h3 className="section-title">overview</h3>
      <Wrapper className="overview-details">
        <Table
          tableCaption="Accounts"
          tableHeader={["", "number", "type", "balance", "BADC", ""]} // BADC: Bank account Details Confirmation
        >
          {accountsValues.map((acc) => {
            return (
              <tr key={acc.number}>
                <td>{accountNumFormatter(acc.number)}</td>
                <td>{acc.type}</td>
                <td>₪ {acc.balance}</td>
                <td
                  className="table-BADC-btn"
                  onClick={() => handleBADC(acc.number)}
                >
                  <FaFileLines />
                </td>
                <td
                  className="table-del-btn"
                  onClick={async () => {
                    await handleDelete(acc.number);
                    navigate("/dashboard");
                  }}
                >
                  <FaTrashCan />
                </td>
              </tr>
            );
          })}
        </Table>
        {accountsValues.length === 0 && (
          <p className="no-accounts-msg">You haven't opened any account yet</p>
        )}
      </Wrapper>
      <StyledAccountForm />
    </section>
  );
}

export default Overview;

export async function action({ params, request }: ActionFunctionArgs) {
  return customAction({
    params,
    request,
    url: "accounts",
    successMessage: "Created successfully",
    redirectPath: "/dashboard",
    specialErrors: [],
  });
}

const handleBADC = async (accountNum: string) => {
  try {
    const response = await fetcher(`accounts/BADC/${accountNum.slice(5)}`);

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

const handleDelete = async (accountNum: string) => {
  try {
    const response = await fetcher(`accounts/${accountNum.slice(5)}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      if (response.status === 404) {
        const responseData = await response.json();
        return toast.error(responseData.msg);
      }
      throw new HTTPError(response);
    }
    const responseData = await response.json();
    toast.success(responseData.msg);
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      throw error;
    }
    console.log(error);
    return error;
  }
};
