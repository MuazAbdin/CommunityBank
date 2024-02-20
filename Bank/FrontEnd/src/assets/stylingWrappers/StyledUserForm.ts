import styled from "styled-components";
import UserDetailsForm from "../../components/UserDetailsForm";

const StyledUserForm = styled(UserDetailsForm)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--background-color-transparent);
  box-shadow: 0 0 10px var(--text-color);
  font-family: var(--main-font);
  font-size: 1.65rem;
  line-height: 1.2;

  .title {
    font-size: 2.5rem;
    font-family: var(--subtitle-font);
    grid-column: 1 / 3;
  }

  fieldset:nth-of-type(2) {
    grid-column: 1;
  }

  .btn {
    grid-column: 2;
    padding-top: 1.5rem;
    align-self: stretch;
    width: 100%;
    padding: 0.75rem 0;
    font-size: 1.65rem;
    font-weight: 500;
  }

  .btn:disabled {
    cursor: not-allowed;
    background-color: var(--grey-500);
  }

  input:disabled {
    cursor: not-allowed;
    background-color: var(--grey-200);
  }

  .main-container:has(input:disabled) {
    background-color: var(--grey-200);
    border-color: var(--grey-200);
  }
`;

export default StyledUserForm;
