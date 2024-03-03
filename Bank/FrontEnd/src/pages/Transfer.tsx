import StyledTransferForm from "../assets/stylingWrappers/StyledTransferForm";
import Input from "../components/Input";

const CATEGORIES = [
  "Entertainment",
  "Food",
  "Government",
  "Healthcare",
  "Housing",
  "Insurance",
  "Miscellaneous",
  "Payments",
  "Salary",
  "Transportation",
];

function Transfer() {
  return (
    <section className="account-subsection-container">
      <StyledTransferForm>
        {/* <label htmlFor="category">Category: </label> */}
        <fieldset>
          <select id="category" name="category" required>
            <option value="" disabled selected>
              Choose a category ...
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </fieldset>
        <Input
          label="Transfer on"
          id="transferOn"
          type="date"
          placeholder="Transfer on"
          autoComplete="off"
          formID="transfer-form"
          min={new Date().toLocaleDateString("fr-ca")}
        />
      </StyledTransferForm>
    </section>
  );
}

export default Transfer;
