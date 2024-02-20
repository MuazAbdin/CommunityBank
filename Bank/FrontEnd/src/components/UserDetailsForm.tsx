import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "./Input";
import { useRef } from "react";
import { REGISTER_FIELDS } from "../utils/constants";

function UserDetailsForm({
  title,
  buttonText,
  className,
  children,
}: {
  title: string;
  buttonText: string;
  className: string;
}) {
  const actionData = useActionData() as { result: string };
  const insertedPassword = useRef<HTMLInputElement>();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="POST" id="register-form" className={className} noValidate>
      <h3 className="title">{title}</h3>
      {REGISTER_FIELDS.map((f) => {
        const validator =
          f.id === "passwordConfirm"
            ? (value: string) =>
                f.validator(insertedPassword.current!.value, value)
            : f.validator;

        return (
          <Input
            key={f.id}
            label={f.label}
            id={f.id}
            type={f.id}
            autoComplete={f.autoComplete ?? null}
            ref={f.id === "password" ? insertedPassword : null}
            placeholder={f.placeholder}
            validator={validator}
            help={f.help}
            isSubmitted={actionData?.result === "emptyFields"}
            disabled={f.id === "IDcard" && title === "edit details"}
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
