import Wrapper from "../assets/stylingWrappers/AccountHeader";
import { accountNumFormatter } from "../utils/inputFormatters";

function AccountHeader({
  number,
  balance,
}: {
  number: string;
  balance: number;
}) {
  return (
    <Wrapper>
      <div className="account-number">
        account no. <strong>&lt;{accountNumFormatter(number)}&gt;</strong>
      </div>
      <div className="account-balance">
        balance: <strong>₪{balance}</strong>
      </div>
    </Wrapper>
  );
}

export default AccountHeader;
