import Wrapper from "../assets/stylingWrappers/InputSelect";
import { IInputValidator } from "../utils/validation";
import { useInput } from "../hooks/useInput";

interface IInputSelectProps {
  label: string;
  id: string;
  validator?: IInputValidator;
  fields: string[];
  // formID?: string;
  // isSubmitted?: boolean;
  submissionCount: number;
  onSubmitErrorMessage?: string;
}

function InputSelect({
  label,
  id,
  validator,
  fields,
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
          <option value="">Choose a {label} ...</option>
          {fields.map((c) => (
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
