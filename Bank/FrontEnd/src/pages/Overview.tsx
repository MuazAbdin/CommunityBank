import { useOutletContext } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Overview";
import StyledAccountForm from "../assets/stylingWrappers/StyledAccountForm";
import { AccountDetails, UserDetails } from "../types/components";
import Table from "../components/Table";
import { accountNumFormatter } from "../utils/inputFormatters";

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
          tableHeader={["", "number", "type", "balance"]}
        >
          {accountsValues.map((acc) => {
            return (
              <tr key={acc.number}>
                <td>{accountNumFormatter(acc.number)}</td>
                <td>{acc.type}</td>
                <td>₪ {acc.balance}</td>
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
