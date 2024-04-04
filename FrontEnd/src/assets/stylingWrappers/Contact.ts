import styled from "styled-components";

const Wrapper = styled.main`
  flex-grow: 1;

  & > div {
    height: calc(100% - 2rem);
    border-radius: var(--border-radius);
    background-color: var(--background-color-transparent);
    box-shadow: 0 0 10px var(--text-color);
    font-family: var(--main-font);
    padding: 2rem;
    margin: 1rem;
    line-height: 1.2;
    overflow-y: scroll;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;
  }
`;

export default Wrapper;
