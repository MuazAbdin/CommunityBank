import { useState } from "react";
import Wrapper from "../assets/stylingWrappers/InputSelect";

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

function InputSelect() {
  const [value, setValue] = useState("");
  return (
    <Wrapper>
      <input
        type="hidden"
        id="category"
        name="category"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      {/* <select defaultValue="Choose a category ..."> */}
      <select value={value} onChange={(e) => setValue(e.currentTarget.value)}>
        <option value="">Choose a category ...</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export default InputSelect;
