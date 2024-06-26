import styled from "styled-components";

const Wrapper = styled.main`
  & > div {
    width: min(100%, 1024px);
    height: 100%;
    margin: auto;
    font-family: var(--main-font);
    padding: 1rem;
    padding-bottom: 0;
    display: grid;
    gap: 0 1rem;
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr 3fr;
    grid-template-areas:
      "aside header"
      "aside content";
    justify-items: stretch;
    align-items: flex-start;

    & > header {
      padding: 0.5rem;
      grid-area: header;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.25em;
      background-color: var(--background-color-transparent);
      border-radius: 0.5rem 0.5rem 0 0;
      color: var(--text-color);

      .welcome-msg {
        text-transform: capitalize;
      }

      .logout-btn {
        font-size: 1.1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        border-radius: 50px;
        padding: 0.5rem 1.25rem;
      }
    }

    .content {
      padding: 0.5rem;
      height: 100%;
      grid-area: content;
      overflow-y: scroll;
      /* margin-top: 1rem; */
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      header {
        background-color: var(--background-color-transparent);
      }

      &:has(.account-subsection-container) {
        padding: 0;
        gap: 0;
      }

      .section-title {
        font-size: 2.5rem;
        font-family: var(--subtitle-font);
        margin-bottom: 0.5rem;
      }
    }
  }

  a:link {
    text-decoration: none;
    color: var(--text-color);
  }

  /* a:visited {
    text-decoration: none;
    color: var(--highlight-color);
  }

  .active {
    background-color: var(--highlight-background-color);
  } */
`;

export default Wrapper;
