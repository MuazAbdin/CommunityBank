import styled from "styled-components";

const Wrapper = styled.fieldset`
  position: relative;
  border: none;

  .react-datepicker-wrapper {
    height: 3.25rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 2px solid #d2f4ff;
    border-radius: 0.5rem;
    background-color: #d2f4ff;
    overflow: hidden;
    position: relative;
  }

  .react-datepicker__input-container,
  .react-datepicker__view-calendar-icon {
    height: 100%;
    display: flex;
    justify-content: stretch;
    align-items: center;
    padding: 0.25rem 0.5rem;
    gap: 1rem;

    svg {
      position: relative;
      padding: 0rem;
      /* box-sizing: content-box; */
    }

    input {
      height: 100%;
      padding: 0;
      color: var(--grey-900);
      font-size: 1.25rem;
      font-family: var(--main-font);
      background-color: #d2f4ff;
      border: none;
      border-radius: var(--border-radius);
    }
  }
`;

export default Wrapper;
