import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: 1rem;
  padding: 2rem;
  background-color: var(--background-color-transparent);
  box-shadow: 0 0 10px var(--text-color);

  .no-accounts-msg {
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--error-text-color);
  }

  table {
    width: 100%;
    font-size: 1.15rem;
    line-height: 1.5;
    text-align: center;
    text-transform: capitalize;
    counter-reset: rowNumber;

    .table-head th {
      /* background-color: var(--highlight-background-color); */
      color: var(--primary-600);
      border-top: 1.5px dashed;
      border-bottom: 1.5px dashed;
    }

    tr:nth-child(even) {
      background-color: var(--highlight-background-color);
    }
    tr:not(:has(th)):hover {
      background-color: var(--background-secondary-color);
    }
    tr:not(:has(th))::before {
      display: table-cell;
      counter-increment: rowNumber;
      content: counter(rowNumber) ".";
      padding-right: 0.3em;
      text-align: right;
    }
    .table-BADC-btn,
    .table-del-btn {
      cursor: pointer;
      &:hover {
        border: 2px solid;
        border-radius: var(--border-radius);
      }

      svg {
        display: block;
        margin: auto;
      }
    }

    .table-del-btn {
      background-color: var(--red-light);
      color: var(--red-dark);
    }
  }
`;

export default Wrapper;
