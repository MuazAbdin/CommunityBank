import styled from "styled-components";

function getColor(hasError: boolean, didEdit: boolean) {
  if (!didEdit) return "#d2f4ff";
  return hasError ? "var(--red-dark)" : "var(--green-dark)";
}

function getBackgroundColor(hasError: boolean, didEdit: boolean) {
  if (!didEdit) return "#d2f4ff";
  return hasError ? "var(--red-light)" : "var(--green-light)";
}

const Wrapper = styled.fieldset<{
  $hasError: boolean;
  $didEdit: boolean;
}>`
  position: relative;
  border: none;

  .input-help-msg {
    text-align: justify;
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 10;
    font-size: 1rem;
    font-weight: 300;
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    padding: 0.35rem 0.75rem;
    list-style: outside;
    display: none;
  }

  &:has(.help-icon:hover) .input-help-msg {
    display: block;
  }

  .main-container {
    height: 3.25rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 2px solid ${(props) => getColor(props.$hasError, props.$didEdit)};
    border-radius: 0.5rem;
    background-color: ${(props) =>
      getBackgroundColor(props.$hasError, props.$didEdit)};
    overflow: hidden;
    position: relative;

    &:has(input:focus) {
      border: 2px solid darkblue;
    }

    .help-icon {
      color: var(--grey-900);
      position: absolute;
      right: 0.75rem;
      top: 0.65rem;
      cursor: pointer;
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

    .input-field {
      order: 2;
      height: 100%;
      display: flex;
      justify-content: stretch;
      align-items: center;
      padding: 0.25rem 0.5rem;
      gap: 0.5rem;

      .validate-icon {
        display: ${(props) => {
          if (!props.$didEdit) return "none";
          return props.$hasError ? "none" : "block";
        }};
        color: var(--green-dark);
      }
    }

    input {
      height: 100%;
      flex-grow: 1;
      color: var(--grey-900);
      font-size: 1.25rem;
      font-family: var(--main-font);
      background-color: ${(props) =>
        getBackgroundColor(props.$hasError, props.$didEdit)};
      border: none;
      border-radius: var(--border-radius);
    }

    input:focus {
      outline: none;
      /* padding-top: 1.25rem; */
    }

    .input-field:has(input:focus) ~ label {
      display: block;
    }

    input:focus::placeholder {
      color: transparent;
    }

    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
`;

export default Wrapper;
