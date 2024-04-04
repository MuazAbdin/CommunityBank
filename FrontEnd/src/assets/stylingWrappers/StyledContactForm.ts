import styled from "styled-components";
import ContactForm from "../../components/ContactForm";

const StyledContactForm = styled(ContactForm)`
  width: 70%;
  /* border-radius: 1rem;
  padding: 2rem;
  background-color: var(--background-color-transparent);
  box-shadow: 0 0 10px var(--text-color); */
  font-family: var(--main-font);
  font-size: 1.65rem;
  line-height: 1.2;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 0.75rem;

  .title {
    font-size: 2.5rem;
    font-family: var(--subtitle-font);
  }

  .main-container:has(#message) {
    height: 10rem;
  }

  fieldset textarea {
    resize: none;
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
`;

export default StyledContactForm;
