import {
  ActionFunctionArgs,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Overview";
import StyledAccountForm from "../assets/stylingWrappers/StyledAccountForm";
import { IUserProfileContext } from "../types/components";
import Table from "../components/Table";
import { accountNumFormatter } from "../utils/inputFormatters";
import { FaFileLines, FaTrashCan } from "react-icons/fa6";
import { customAction } from "../utils/customAction";
import { fetcher } from "../utils/fetcher";
import { HTTPError } from "../utils/cutomErrors";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import Modal from "../components/Modal";

function Overview() {
  const { accountsValues } = useOutletContext<IUserProfileContext>();

  const [isModalOpened, setIsModalOpened] = useState(false);
  const closeModal = () => setIsModalOpened(false);
  const openModal = () => setIsModalOpened(true);

  const clikcedAccountRef = useRef<string>("");
  const navigate = useNavigate();

  return (
    <section className="content">
      <Modal
        isOpened={isModalOpened}
        onCancel={closeModal}
        onConfirm={async () => {
          try {
            await handleDelete(clikcedAccountRef.current);
            navigate("/dashboard");
          } catch (error: unknown) {
            if (error instanceof HTTPError) {
              await error.setMessage();
              toast.error(error.message);
            }
            console.log(error);
            throw error;
          } finally {
            closeModal();
          }
        }}
      />

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
                  onClick={() => {
                    clikcedAccountRef.current = acc.number;
                    openModal();
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

async function handleDelete(accountNum: string) {
  const response = await fetcher(`accounts/${accountNum.slice(5)}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new HTTPError(response);
  const responseData = await response.json();
  toast.success(responseData.msg);
}
