import styled from "styled-components";

const Wrapper = styled.section`
  font-family: var(--main-font);
  display: grid;
  grid-template-columns: auto 2fr 1fr;
  grid-template-areas:
    "icon title title"
    "icon message message"
    ". btns btns";
  align-items: end;
  gap: 0.5em 1em;

  @keyframes slide-down-fade-in {
    from {
      opacity: 0;
      transform: translateY(-3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-up-fade-in {
    from {
      opacity: 0;
      transform: translateY(3rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .title {
    grid-area: title;
    text-transform: uppercase;
    color: darkred;
    font-weight: 500;
  }

  & > svg {
    grid-area: icon;
    font-size: 4em;
    color: darkred;
  }

  .message {
    grid-area: message;
    font-size: 1.15rem;
    text-align: center;

    p:nth-child(2) {
      margin: 0.5rem 0;
      font-weight: 500;
      text-decoration: underline;
    }

    svg {
      color: darkred;
    }
  }

  .btns {
    grid-area: btns;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .ok-btn {
    background-color: darkred;
    color: var(--grey-200);
    transition: border;

    &:hover {
      animation: bgPulse 1s ease-in-out infinite;
    }

    @keyframes bgPulse {
      0%,
      100% {
        background-color: darkred;
      }
      50% {
        background-color: #3e0505;
      }
    }
  }

  .cancel-btn {
    background-color: var(--grey-200);
    color: var(--grey-900);
    font-weight: 500;

    &:hover {
      background-color: var(--grey-500);
    }
  }

  button {
    cursor: pointer;
    font-size: 1.1rem;
    font-family: var(--main-font);
    text-transform: capitalize;
    padding: 0.5rem 1.5rem;
    border: none;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  }
`;

export default Wrapper;
