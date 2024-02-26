import styled from "styled-components";

const Wrapper = styled.main`
  flex-grow: 1;
  background-image: url("./src/assets/images/mainBG.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: 30% 0%;
  background-repeat: no-repeat;
  overflow-y: scroll;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
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

    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.25rem;
      font-size: 3rem;
      font-family: var(--subtitle-font);
      padding-bottom: 2rem;
    }

    fieldset,
    div {
      align-self: center;
      width: 70%;
    }

    .btn {
      align-self: center;
      width: 70%;
      padding: 0.75rem 0;
      font-size: 1.65rem;
      font-weight: 500;
    }

    .links-group {
      margin-top: 1rem;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-secondary-color);
      display: flex;
      justify-content: center;
      width: 100%;
      gap: 2rem;
    }

    .links-group > a:hover {
      text-decoration: underline;
    }

    .invalid-credentials {
      padding: 0.5rem 0;
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--red-dark);
      background-color: var(--red-light);
    }
  }
`;

export default Wrapper;
