import Wrapper from "../assets/stylingWrappers/InputSelect";
import { IInputValidator } from "../utils/validation";
import { useInput } from "../hooks/useInput";

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

interface IInputSelectProps {
  label: string;
  id: string;
  validator?: IInputValidator;
  // formID?: string;
  // isSubmitted?: boolean;
  submissionCount: number;
  onSubmitErrorMessage?: string;
}

function InputSelect({
  label,
  id,
  validator,
  // formID,
  // isSubmitted,
  submissionCount = 0,
  onSubmitErrorMessage,
}: IInputSelectProps) {
  const {
    value,
    hasError,
    errorMessage,
    showMessage,
    handleInputChange,
    handleInputBlur,
  } = useInput(validator, undefined, onSubmitErrorMessage, submissionCount, "");

  return (
    <Wrapper $hasError={hasError} $showMessage={showMessage}>
      <div className="main-container">
        <input
          type="hidden"
          id={id}
          name={id}
          value={value}
          onChange={handleInputChange}
        />
        {/* <select defaultValue="Choose a category ..."> */}
        <select
          id={`select${label}`}
          value={value}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        >
          <option value="">Choose a category ...</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c.toLowerCase()}>
              {c}
            </option>
          ))}
        </select>
        <label htmlFor={`select${label}`}>{label}</label>
        {showMessage && <div className="validation-result">{errorMessage}</div>}
      </div>
    </Wrapper>
  );
}

export default InputSelect;
