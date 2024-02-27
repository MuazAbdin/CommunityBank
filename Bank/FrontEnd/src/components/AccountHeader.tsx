import Wrapper from "../assets/stylingWrappers/AccountHeader";

function AccountHeader() {
  return (
    <Wrapper>
      <div className="account-number">
        account no. <strong>&lt;24-891-384549&gt;</strong>
      </div>
      <div className="account-balance">
        balance: <strong>₪2500</strong>
      </div>
    </Wrapper>
  );
}

export default AccountHeader;
