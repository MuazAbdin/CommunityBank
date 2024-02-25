import { ChangeEvent, useEffect, useState } from "react";
import { IInputValidator } from "../utils/validation";

export function useInput(
  validator: IInputValidator | undefined,
  errorMessage: string,
  isSubmitted: boolean
) {
  const [value, setValue] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isSubmitted) setShowMessage(true);
  }, [isSubmitted]);

  const validationResult = {
    result: validator ? validator(value).result : errorMessage === "",
    message: validator ? validator(value).message : errorMessage,
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
    setShowMessage(false);
  }

  function handleInputBlur() {
    if (validator) setShowMessage(true);
  }

  return {
    value,
    hasError: !validationResult.result,
    errorMessage: validationResult.message,
    showMessage,
    handleInputChange,
    handleInputBlur,
  };
}
