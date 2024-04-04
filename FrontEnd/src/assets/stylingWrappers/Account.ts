import styled from "styled-components";

const Wrapper = styled.section`
  .account-subsection-container {
    flex-grow: 1;
    padding: 2rem;
    padding-top: 1rem;
    margin: 0;
    background-color: var(--background-color-transparent);
    font-family: var(--main-font);
    overflow-y: scroll;
    position: relative;

    .pdf-btn {
      position: absolute;
      left: 2.5rem;
      transform: translateY(0.5rem);
      font-size: 1.5rem;
      background: none;
      border: none;
      box-shadow: none;
      padding: 0;
      color: var(--text-color);
    }

    .table-loanDetails-btn {
      cursor: pointer;
      font-size: 1.5rem;
      background-color: var(--yellow-light);
      color: var(--yellow-dark);
      border: 1px solid;
      border-radius: var(--border-radius);
      transition: all 100ms ease-in-out;

      &:hover {
        box-shadow: 0 0 7px var(--text-color);
      }

      svg {
        display: block;
        margin: auto;
      }
    }
  }
`;

export default Wrapper;
