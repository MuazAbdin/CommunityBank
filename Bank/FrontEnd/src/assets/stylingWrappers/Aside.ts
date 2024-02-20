import styled from "styled-components";

const Wrapper = styled.aside`
  grid-area: aside;

  menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    font-size: 1.25em;
    text-transform: capitalize;
  }

  li {
    text-align: justify;
    cursor: pointer;
    color: var(--highlight-color);
    border-bottom: 1px dashed var(--highlight-color);
    padding: 0.5em;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  li:hover {
    background-color: var(--highlight-background-color);
  }

  a:visited {
    text-decoration: none;
    color: var(--highlight-color);
  }

  .active {
    background-color: var(--highlight-background-color);
  }
`;

export default Wrapper;
