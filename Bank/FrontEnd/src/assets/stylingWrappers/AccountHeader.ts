import styled from "styled-components";

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25em;
  color: var(--text-color);
  text-transform: capitalize;
  /* margin-bottom: 0.5rem; */
  padding: 0.5rem;

  .account-number > strong {
    font-family: var(--numbers-font);
  }
`;

export default Wrapper;
