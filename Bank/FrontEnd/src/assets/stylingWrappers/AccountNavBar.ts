import styled from "styled-components";

const Wrapper = styled.nav`
  background: var(--background-color-transparent);

  menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    /* padding: 0rem 2rem; */
    background-color: var(--background-color-transparent);
    border-top: 1px dashed var(--text-color);
    border-bottom: 1px dashed var(--text-color);
    font-family: var(--main-font);
    font-size: 1.25rem;
    text-transform: capitalize;

    li {
      padding: 0.5rem;
      flex-grow: 1;

      a {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
      }
    }

    li:hover,
    li:has(> .active) {
      background-color: var(--grey-400);
    }
  }
`;

export default Wrapper;
