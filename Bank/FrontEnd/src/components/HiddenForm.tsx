import { Form } from "react-router-dom";
import { IInputField, LOAN_FIELDS } from "../utils/constants";
import { PropsWithChildren } from "react";
LOAN_FIELDS;

interface IHiddenFormProps {
  className?: string;
  fields: IInputField[];
  values: { [key: string]: number };
}

function HiddenForm({
  className,
  fields,
  values,
  children,
}: PropsWithChildren<IHiddenFormProps>) {
  return (
    <form>
      {fields.map((f) => (
        <input key={f.id} id={f.id} type="hidden" value={values[f.id]} />
      ))}

      {children}
    </form>
  );
}

export default HiddenForm;
