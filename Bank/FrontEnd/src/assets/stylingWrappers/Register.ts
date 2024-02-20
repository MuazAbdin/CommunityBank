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
    margin: 2rem;
    width: 750px;
    margin-left: auto;
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
