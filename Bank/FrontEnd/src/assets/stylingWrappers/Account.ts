import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;

  .account-subsection-container {
    flex-grow: 1;
    border-radius: 1rem;
    padding: 2rem;
    padding-top: 1rem;
    background-color: var(--background-color-transparent);
    box-shadow: 0 0 10px var(--text-color);
    font-family: var(--main-font);
    margin-top: 1rem;
    overflow-y: scroll;
  }
`;

export default Wrapper;
