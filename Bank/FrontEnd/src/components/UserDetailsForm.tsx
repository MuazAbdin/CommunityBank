import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "./Input";
import { PropsWithChildren, useRef } from "react";
import {
  IUserDetailsFormProps,
  IUserFormActionData,
} from "../interfaces/components";

function UserDetailsForm({
  formID,
  title,
  method,
  buttonText,
  className,
  fields,
  values,
  children,
}: PropsWithChildren<IUserDetailsFormProps>) {
  const actionData = useActionData() as IUserFormActionData;
  const insertedPassword = useRef<HTMLInputElement>();

  const invalidCredentials = actionData?.msg === "invalid credentials";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method={method} id={formID} className={className} noValidate>
      <h3 className="title">{title}</h3>
      {invalidCredentials && (
        <div className="invalid-credentials">{actionData?.msg}</div>
      )}
      {fields.map((f) => {
        const validator =
          f.id === "passwordConfirm"
            ? (value: string) =>
                f.validator!(insertedPassword.current?.value || "", value)
            : f.validator;

        let severErrorMsg = "";
        if (actionData && actionData.data) {
          const inputItem = actionData.data.find((item) => item.name === f.id);
          if (inputItem) severErrorMsg = inputItem.message;
        }

        return (
          <Input
            key={f.id}
            label={f.label}
            id={f.id}
            type={f.type}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete ?? "off"}
            ref={f.id === "password" ? insertedPassword : null}
            validator={validator}
            severErrorMsg={severErrorMsg}
            prevValue={values?.[f.id] || ""}
            help={f.help}
            isSubmitted={actionData?.msg === "Invalid inputs"}
            disabled={f.disabled}
            formID={formID}
          />
        );
      })}
      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : `${buttonText}`}
      </button>
      {children}
    </Form>
  );
}

export default UserDetailsForm;
