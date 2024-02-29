import styled from "styled-components";

const Wrapper = styled.section`
  --loan-color: #117245;
  --interest-color: #b32733;

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;

  font-size: 1.25rem;
  line-height: 1.5;

  .calc-piechart {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 250px;
    height: 250px;
    border-radius: 50%;

    background: radial-gradient(
        closest-side,
        var(--background-color-piechart) 62%,
        rgb(77, 128, 128) 63% 66%,
        var(--background-color-piechart) 67% 70%,
        transparent 71% 96%,
        var(--background-color-piechart) 97% 100%
      ),
      conic-gradient(var(--loan-color) 90deg, var(--interest-color) 90deg);
  }

  .total-amount {
    width: 60%;
    height: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    strong {
      color: rgb(77, 128, 128);
    }
  }

  .calc-legend {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;
    text-transform: capitalize;

    .calc-legend__item {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      strong {
        padding-left: 0.5rem;
      }

      .payment {
        color: purple;
      }
      .interest {
        color: var(--interest-color);
      }
      .loan {
        color: var(--loan-color);
      }
    }
  }

  .btn {
    grid-column: 1 / 3;
    justify-self: center;
    width: 70%;
    padding-top: 1.5rem;
    padding: 0.75rem 0;
    font-size: 1.65rem;
    font-weight: 500;
  }

  .btn:disabled {
    cursor: not-allowed;
    background-color: var(--grey-500);
  }
`;

export default Wrapper;
