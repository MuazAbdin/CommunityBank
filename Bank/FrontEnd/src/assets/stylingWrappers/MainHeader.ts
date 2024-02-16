import styled from "styled-components";

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  font-family: var(--main-font);
  font-size: 1.25rem;
  border-bottom: 1px solid;
  box-shadow: 0 1px 15px;
  /* background-color: #ee94a9; */

  menu {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 0.25rem;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    color: var(--primary-400);
    color: var(--white);
    font-size: 1.25rem;
    font-weight: 600;
    border: 1px solid transparent;
    border-radius: var(--border-radius);
    padding: 0.5rem;
    transition: var(--transition);
  }

  li:hover {
    box-shadow: 0 0 5px black;
  }

  .mode-btn {
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 1.5rem;
    color: var(--primary-600);
    border: 1px solid;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: 3rem;
    font-family: var(--title-font);
    font-size: 2rem;
    color: #ee94a9;
    background-color: white;
    padding: 0 1rem;
    border-radius: 0.5rem;
  }

  .logo:hover {
    cursor: pointer;
    box-shadow: 0 0 5px black;
  }

  img {
    height: 90%;
  }

  a:link {
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
    color: black;
  }
  a:hover {
    text-decoration: none;
  }
  a:active {
    text-decoration: none;
  }
`;

export default Wrapper;
