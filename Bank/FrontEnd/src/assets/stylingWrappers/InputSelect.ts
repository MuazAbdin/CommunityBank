import styled from "styled-components";

const Wrapper = styled.fieldset`
  width: 70%;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

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
`;

export default Wrapper;
