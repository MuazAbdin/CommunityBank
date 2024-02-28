import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import Wrapper from "../assets/stylingWrappers/Input";
import { useInput } from "../hooks/useInput";
import { GrValidate } from "react-icons/gr";
import { TfiHelpAlt } from "react-icons/tfi";
import { IInputValidator } from "../utils/validation";
import { IInputFormatter } from "../utils/inputFormatters";

interface IInputProps {
  label: string;
  id: string;
  validator?: IInputValidator;
  formatter?: IInputFormatter;
  formID?: string;
  help?: string;
  isSubmitted?: boolean;
  severErrorMsg?: string;
  prevValue?: string;
}

const Input = forwardRef(function Input(
  {
    label,
    id,
    validator,
    formatter,
    help,
    isSubmitted,
    severErrorMsg,
    prevValue,
    formID,
    ...props
  }: IInputProps & ComponentPropsWithoutRef<"input">,
  ref: ForwardedRef<HTMLInputElement>
) {
  const {
    value,
    hasError,
    errorMessage,
    showMessage,
    handleInputChange,
    handleInputBlur,
  } = useInput(validator, formatter, severErrorMsg, isSubmitted, prevValue);

  return (
    <Wrapper $hasError={hasError} $showMessage={showMessage}>
      {help && <InputHelp message={help} />}
      <div className="main-container">
        <span className="input-field">
          {formID !== "login-form" && showMessage && (
            <GrValidate className="validate-icon" />
          )}
          <input
            id={id}
            name={id}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            {...props}
            ref={ref}
          />
          {help && <TfiHelpAlt className="help-icon" />}
        </span>
        <label htmlFor={id}>{label}</label>
        {showMessage && <div className="validation-result">{errorMessage}</div>}
      </div>
    </Wrapper>
  );
});

export default Input;

function InputHelp({ message }: { message: string }) {
  const instructions = message.split(".").slice(0, -1);
  if (instructions.length === 1)
    return <div className="input-help-msg">{message}</div>;
  return (
    <menu className="input-help-msg">
      {instructions.map((msg) => (
        <li key={msg}>{msg}</li>
      ))}
    </menu>
  );
}
