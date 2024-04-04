import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IInputValidator } from "../utils/validation";
import { IInputFormatter } from "../utils/inputFormatters";

export function useInput(
  validator?: IInputValidator,
  formatter?: IInputFormatter,
  errorMessage: string = "",
  // isSubmitted: boolean = false,
  submissionCount: number = 0,
  prevValue: string = ""
) {
  // console.log(validator);
  const [value, setValue] = useState(prevValue || "");
  // const [showMessage, setShowMessage] = useState(false);

  const submissionRef = useRef(0);
  const [showOnBlurMessage, setShowOnBlurMessage] = useState(false);
  const [showOnSubmitMessage, setShowOnSubmitMessage] = useState(false);

  const validationResult = { result: true, message: "", show: false };
  if (showOnSubmitMessage) {
    validationResult.result = errorMessage === "";
    validationResult.message = errorMessage;
    validationResult.show = true;
  }
  if (showOnBlurMessage && validator) {
    validationResult.result = validator(value).result;
    validationResult.message = validator(value).message;
    validationResult.show = true;
  }

  useEffect(() => {
    // if (isSubmitted) setShowMessage(true);
    if (submissionCount > submissionRef.current) {
      setShowOnSubmitMessage(true);
      setShowOnBlurMessage(false);
      submissionRef.current++;
    }
  }, [submissionCount]);

  // const validationResult = {
  //   result: validator ? validator(value).result : errorMessage === "",
  //   message: validator ? validator(value).message : errorMessage || "",
  // };

  function handleInputChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    // let formattedValue = event.currentTarget.value;
    // if (formatter) formattedValue = formatter(event.currentTarget.value);
    setValue(event.currentTarget.value);
    // setShowMessage(false);
    setShowOnBlurMessage(false);
    setShowOnSubmitMessage(false);
  }

  function handleInputBlur() {
    setShowOnSubmitMessage(false);
    if (validator) setShowOnBlurMessage(true);
    // if (validator) setShowMessage(true);
    // setShowMessage(true);
  }

  return {
    value,
    hasError: !validationResult.result,
    errorMessage: validationResult.message,
    showMessage: validationResult.show,
    // showMessage: showMessage,
    handleInputChange,
    handleInputBlur,
  };
}
