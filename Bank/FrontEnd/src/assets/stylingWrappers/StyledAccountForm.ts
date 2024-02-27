import styled from "styled-components";
import NewAccountForm from "../../components/NewAccountForm";

const StyledAccountForm = styled(NewAccountForm)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--background-color-transparent);
  box-shadow: 0 0 10px var(--text-color);
  font-family: var(--main-font);
  font-size: 1.5rem;
  line-height: 1.2;

  .title {
    font-size: 2.5rem;
    font-family: var(--subtitle-font);
  }

  p {
    /* text-transform: capitalize; */
    align-self: flex-start;
  }

  fieldset {
    border: none;
    align-self: stretch;
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .d-selector {
    flex-grow: 1;
    background-color: var(--grey-300);
    color: var(--primary-600);
    padding: 0.5rem;
    border-radius: 0.5rem;

    &:hover {
      box-shadow: 0 0 5px var(--text-color);
    }

    &:has(> input:checked) {
      color: var(--red-dark);
      font-weight: 600;
      box-shadow: 0 0 5px var(--text-color);
    }

    input {
      display: none;
    }

    label {
      text-transform: capitalize;
      display: block;
      width: 100%;
      cursor: pointer;
    }
  }

  .btn {
    padding-top: 1.5rem;
    width: 50%;
    padding: 0.75rem 0;
    font-size: 1.65rem;
    font-weight: 500;
  }

  .btn:disabled {
    cursor: not-allowed;
    background-color: var(--grey-500);
  }
`;

export default StyledAccountForm;
