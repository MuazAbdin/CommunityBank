import styled from "styled-components";
import LoanForm from "../../components/LoanForm";

const StyledLoanForm = styled(LoanForm)`
  margin-top: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  border-radius: 1rem;
  padding: 2rem;
  padding-top: 1rem;
  box-shadow: 0 0 10px var(--text-color);
  font-family: var(--main-font);
  font-size: 1.5rem;
  line-height: 1.2;

  .title {
    font-size: 2rem;
    font-family: var(--subtitle-font);
    grid-column: 1 / 3;
  }

  /* fieldset:nth-of-type(1) {
    grid-column: 1/3;
    width: 70%;
    justify-self: center;
  } */

  fieldset:nth-of-type(2) {
    grid-column: 1;
  }

  fieldset {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    &:has(#loanAmount) {
      /* width: calc(70% - 0.5ch); */

      &::before {
        content: "₪";
      }
    }
  }

  .btn {
    grid-column: 1/3;
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

export default StyledLoanForm;
