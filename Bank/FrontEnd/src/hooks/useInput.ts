import { ChangeEvent, useEffect, useState } from "react";
import { IInputValidator } from "../utils/validation";
import { IInputFormatter } from "../utils/inputFormatters";

export function useInput(
  validator?: IInputValidator,
  formatter?: IInputFormatter,
  errorMessage?: string,
  isSubmitted?: boolean,
  prevValue?: string
) {
  const [value, setValue] = useState(prevValue || "");
  const [showMessage, setShowMessage] = useState(false);

  // useEffect(() => {
  //   if (isSubmitted) setShowMessage(true);
  // }, [isSubmitted]);

  const validationResult = {
    result: validator ? validator(value).result : errorMessage === "",
    message: validator ? validator(value).message : errorMessage || "",
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    // let formattedValue = event.currentTarget.value;
    // if (formatter) formattedValue = formatter(event.currentTarget.value);
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
    showMessage: isSubmitted || showMessage,
    handleInputChange,
    handleInputBlur,
  };
}
