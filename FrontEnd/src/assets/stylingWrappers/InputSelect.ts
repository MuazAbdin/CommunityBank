import styled from "styled-components";

function getColor(hasError: boolean, showMessage: boolean) {
  if (!showMessage) return "#d2f4ff";
  return hasError ? "var(--red-dark)" : "var(--green-dark)";
}

function getBackgroundColor(hasError: boolean, showMessage: boolean) {
  if (!showMessage) return "#d2f4ff";
  return hasError ? "var(--red-light)" : "var(--green-light)";
}

const Wrapper = styled.fieldset<{
  $hasError: boolean;
  $showMessage: boolean;
}>`
  width: 70%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  .main-container {
    height: 3.25rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 2px solid
      ${(props) => getColor(props.$hasError, props.$showMessage)};
    border-radius: 0.5rem;
    background-color: ${(props) =>
      getBackgroundColor(props.$hasError, props.$showMessage)};

    overflow: hidden;
    position: relative;

    &:has(select:focus) {
      border: 2px solid darkblue;
    }

    label {
      align-self: flex-start;
      color: darkblue;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      padding-bottom: 0;
      order: 1;
      display: none;
      transition: display 1s ease;
    }

    .validation-result {
      text-align: justify;
      align-self: flex-start;
      color: var(--red-dark);
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      padding-top: 0;
      order: 3;
      display: ${(props) => (props.$hasError ? "block" : "none")};
      transition: display 1s ease;
    }

    select {
      order: 2;
      height: 100%;
      width: 100%;
      padding: 0.25rem 0.5rem;
      color: var(--grey-900);
      font-size: 1.25rem;
      font-family: var(--main-font);
      background-color: ${(props) =>
        getBackgroundColor(props.$hasError, props.$showMessage)};
      border: none;
      border-radius: var(--border-radius);
    }

    select:disabled {
      cursor: not-allowed;
      background-color: var(--grey-200);
    }

    select:focus {
      outline: none;
      /* padding-top: 1.25rem; */
    }

    .main-container:has(select:focus) label {
      display: block;
    }
  }
`;

export default Wrapper;
