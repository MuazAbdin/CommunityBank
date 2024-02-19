import { forwardRef } from "react";
import Wrapper from "../assets/stylingWrappers/Input";
import { useInput } from "../hooks/useInput";
import { GrValidate } from "react-icons/gr";
import { TfiHelpAlt } from "react-icons/tfi";

interface IInputProps {
  label: string;
  id: string;
  validator?: (v: string) => boolean;
}

const Input = forwardRef(function Input(
  { label, id, validator, help, isSubmitted, ...props }: IInputProps & any,
  ref
) {
  const { value, hasError, didEdit, handleInputChange, handleInputBlur } =
    useInput(validator, isSubmitted);

  return (
    <Wrapper $hasError={hasError} $didEdit={didEdit}>
      {help && <InputHelp message={help} />}
      <div className="main-container">
        <span className="input-field">
          {validator && <GrValidate className="validate-icon" />}
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
        {validator && (
          <div className="validation-result">
            {label} is {value === "" ? "required" : "invalid"}
          </div>
        )}
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
