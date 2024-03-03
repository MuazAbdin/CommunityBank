import styled from "styled-components";
import TransferForm from "../../components/TransferForm";

const StyledTransferForm = styled(TransferForm)`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  padding: 2rem;
  /* background-color: var(--background-color-transparent); */
  box-shadow: 0 0 10px var(--text-color);
  font-family: var(--main-font);
  font-size: 1.5rem;
  line-height: 1.2;

  .title {
    font-size: 2.5rem;
    font-family: var(--subtitle-font);
  }

  fieldset {
    width: 70%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    &:has(#transferAmount) {
      /* width: calc(70% - 0.5ch); */

      &::before {
        content: "₪";
      }
    }

    select {
      height: 3.25rem;
      width: 100%;
      border: 2px solid #d2f4ff;
      border-radius: 0.5rem;
      background-color: #d2f4ff;
      font-size: 1.25rem;
      font-family: var(--main-font);
      padding: 0.25rem 0.5rem;
    }
  }

  .btn {
    width: 70%;
    padding-top: 1.5rem;
    padding: 0.75rem 0;
    font-size: 1.65rem;
    font-weight: 500;
  }

  .btn:disabled {
    cursor: not-allowed;
    background-color: var(--grey-500);
  }
`;

export default StyledTransferForm;
