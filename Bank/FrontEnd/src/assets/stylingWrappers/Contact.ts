import styled from "styled-components";

const Wrapper = styled.main`
  flex-grow: 1;
  overflow-y: scroll;

  & > div {
    height: calc(100% - 2rem);
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
    gap: 1.5rem;

    .title {
      font-size: 2.25rem;
      font-weight: 500;
      font-family: var(--title-font);
      letter-spacing: 0.15ch;
      text-transform: uppercase;
      color: var(--highlight-color);
      margin: 2rem 0;
    }

    .contact-item {
      align-self: flex-start;
      transform: translateX(60%);
      justify-content: flex-start;
      width: 50%;
      gap: 1rem;
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
`;

export default Wrapper;
