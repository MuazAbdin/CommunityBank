import styled from "styled-components";

const Wrapper = styled.main`
  /* flex-grow: 1;
  background-image: url("/images/mainBG.jpg");
  background-attachment: fixed;
  background-size: cover;
  background-position: 30% 0%;
  background-repeat: no-repeat;
  overflow-y: scroll; */

  .welcome {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
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
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.25rem;
    font-size: 3rem;
    font-family: var(--subtitle-font);
    padding-bottom: 2rem;
  }

  p {
    text-align: justify;
  }

  .auth-message {
    font-size: 1.75rem;
    font-weight: 500;
    padding-top: 1rem;
    color: var(--highlight-color);
  }

  .btn-group {
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
`;

export default Wrapper;
