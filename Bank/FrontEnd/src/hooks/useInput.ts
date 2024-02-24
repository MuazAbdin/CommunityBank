import { ChangeEvent, useState } from "react";
import { IInputValidator } from "../utils/validation";

export function useInput(
  validator: IInputValidator | undefined,
  isSubmitted: boolean
) {
  const [value, setValue] = useState("");
  const [didEdit, setDidEdit] = useState(false);

  const { result, message } = validator
    ? validator(value)
    : { result: true, message: "valid" };

  const hasError = (isSubmitted || didEdit) && !result;

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value,
    hasError,
    errorMessage: message,
    didEdit: isSubmitted || didEdit,
    handleInputChange,
    handleInputBlur,
  };
}
