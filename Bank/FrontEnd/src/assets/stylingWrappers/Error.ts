import styled from "styled-components";

const Wrapper = styled.main`
  flex-grow: 1;
  overflow-y: scroll;
  border-radius: var(--border-radius);
  background-color: var(--background-color-transparent);
  box-shadow: 0 0 10px var(--text-color);
  font-family: var(--main-font);
  padding: 2rem;
  margin: 1rem;
  line-height: 1.2;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 2.5rem;

  font-size: 5rem;
  font-weight: 700;
  color: var(--highlight-color);
  padding-top: 5rem;

  .error-header {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    gap: 1.5rem;
    text-shadow: 2px 2px 5px;
  }

  .error-data {
    font-size: 1.25rem;
    color: var(--error-text-color);
  }
`;

export default Wrapper;
