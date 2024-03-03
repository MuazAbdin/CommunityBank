import styled from "styled-components";
import Search from "../../components/Search";

const StyledSearch = styled(Search)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 0.75rem;
  font-size: 1rem;
  line-height: 1.2;

  fieldset {
    border: none;
    height: 2rem;

    input {
      height: 100%;
      border: none;
      border-radius: 50px;
      padding: 0 0.75rem;
      font-family: var(--main-font);
      font-size: 1rem;
    }
  }

  .date-search {
    input {
      margin: 0 0.5rem;
    }
  }

  .text-search {
    position: relative;

    button {
      height: 100%;
      width: 2rem;
      padding: 0;
      position: absolute;
      right: 0;
      top: 0;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--primary-600);
      background-color: var(--yellow-light);

      &:hover {
        border: 1px solid var(--text-color);
      }
    }
  }
`;

export default StyledSearch;
