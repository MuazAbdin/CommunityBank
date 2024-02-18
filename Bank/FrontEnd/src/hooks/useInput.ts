import { ChangeEvent, useState } from "react";

export function useInput(validator: (v: string) => boolean) {
  const [value, setValue] = useState("");
  const [didEdit, setDidEdit] = useState(false);

  const hasError = didEdit && validator && !validator(value);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return { value, hasError, didEdit, handleInputChange, handleInputBlur };
}
