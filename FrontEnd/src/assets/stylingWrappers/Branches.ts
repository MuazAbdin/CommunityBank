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

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0.25rem;

    .title {
      font-size: 2.25rem;
      font-weight: 500;
      font-family: var(--title-font);
      letter-spacing: 0.15ch;
      text-transform: uppercase;
      color: var(--highlight-color);
      margin: 1rem 0;
    }

    .branches-cards {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 1.5rem;
      padding: 1.5rem;
      overflow-y: scroll;

      .branch-card {
        background-color: var(--background-color-transparent);
        border: 1px solid;
        box-shadow: 0 0 10px;
        border-radius: 1rem;
        padding: 0 1rem;

        .branch-card__item {
          justify-content: flex-start;
          gap: 1rem;
          font-size: 1.25rem;
          font-weight: 500;
          margin: 1rem 0;
        }
      }
    }
  }
`;

export default Wrapper;
