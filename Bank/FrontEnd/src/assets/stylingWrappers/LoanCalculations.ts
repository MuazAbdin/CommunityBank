import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 0 10px var(--text-color);
  font-family: var(--main-font);
  font-size: 1.5rem;
  line-height: 1.2;
  position: relative;

  .arrow-continer {
    position: absolute;
    width: calc(3rem * 1.2);
    height: calc(3rem * 0.6);
    border-top: none;
    position: absolute;
    top: 0;
    box-shadow: inset 0 0 10px var(--text-color);
    border-radius: 0 0 3rem 3rem;

    .arrow-symbol {
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--primary-300);
      color: var(--grey-900);
      position: absolute;
      top: 0;
      transform: translate(10%, -50%);
      border-radius: 50%;
      z-index: 2;
    }
  }
`;

export default Wrapper;
