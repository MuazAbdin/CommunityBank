import styled from "styled-components";

const Wrapper = styled.main`
  flex-grow: 1;
  background-image: url("./src/assets/images/mainBG.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: 30% 0%;
  background-repeat: no-repeat;
  overflow-y: scroll;

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    font-size: 3rem;
    font-family: var(--subtitle-font);
    padding-bottom: 2rem;
  }

  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    border-radius: 1rem;
    padding: 2rem;
    margin: 2rem;
    background-color: var(--background-color-transparent);
    box-shadow: 0 0 10px var(--text-color);
    width: 750px;
    margin-left: auto;
    font-family: var(--main-font);
    font-size: 1.65rem;
    line-height: 1.2;
  }

  .title {
    grid-column: 1 / 3;
  }

  fieldset:nth-of-type(2) {
    grid-column: 1;
  }

  .btn-group {
    grid-column: 1 / 3;
    padding-top: 1.5rem;
    align-self: stretch;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
  }

  .btn-group a {
    flex-grow: 1;
  }

  .btn {
    width: 100%;
    padding: 0.75rem 0;
    font-size: 1.65rem;
    font-weight: 500;
  }

  .reset {
    background-color: var(--red-dark);
    color: var(--red-light);
  }

  .reset:hover {
    background-color: var(--red-light);
    color: var(--red-dark);
  }

  .links-group {
    margin-top: 1rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-secondary-color);
    grid-column: 1 / 3;
  }

  .links-group > a:hover {
    text-decoration: underline;
  }
`;

export default Wrapper;
