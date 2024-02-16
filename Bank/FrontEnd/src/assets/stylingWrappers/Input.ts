import styled from "styled-components";

const Wrapper = styled.div`
  height: 3.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  /* border: 2px solid var(--grey-200); */
  border: 2px solid #d2f4ff;
  border-radius: 0.5rem;
  background-color: #d2f4ff;
  overflow: hidden;

  &:has(input:focus) {
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

  .error {
    color: var(--red-dark);
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    padding-top: 0;
    order: 3;
    display: none;
    transition: display 1s ease;
  }

  input {
    height: 100%;
    order: 2;
    color: var(--grey-900);
    font-size: 1.25rem;
    font-family: var(--main-font);
    padding: 0.25rem 0.5rem;
    /* background-color: var(--grey-200); */
    background-color: #d2f4ff;
    border: none;
    border-radius: var(--border-radius);
  }

  input:focus {
    outline: none;
    /* padding-top: 1.25rem; */
  }

  input:focus ~ label {
    display: block;
    font-weight: 600;
  }

  /* input:focus ~ .error {
    display: block;
    font-weight: 600;
  } */

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
`;

export default Wrapper;
