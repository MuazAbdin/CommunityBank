import { ActionFunctionArgs, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Overview";
import StyledAccountForm from "../assets/stylingWrappers/StyledAccountForm";
import { AccountDetails, UserDetails } from "../types/components";
import Table from "../components/Table";
import { accountNumFormatter } from "../utils/inputFormatters";
import { FaFileLines, FaTrashCan } from "react-icons/fa6";
import { customAction } from "../utils/customAction";

function Overview() {
  const { accountsValues } = useOutletContext() as {
    userValues: UserDetails;
    accountsValues: AccountDetails[];
  };

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
                <td>
                  <FaFileLines />
                </td>
                <td>
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
