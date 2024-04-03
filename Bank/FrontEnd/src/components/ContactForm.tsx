import { PropsWithChildren, useRef } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "./Input";
import { IUserFormActionData } from "../types/components";
import { CONTACT_US_FIELDS } from "../utils/constants";

function ContactForm({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const actionData = useActionData() as IUserFormActionData;

  const submissionCountRef = useRef(0);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="POST" id="contact-form" className={className} noValidate>
      <h3 className="title">contact us</h3>
      {CONTACT_US_FIELDS.map((f) => {
        let severErrorMsg = "";
        if (actionData && actionData.data) {
          const inputItem = actionData.data.find((item) => item.name === f.id);
          if (inputItem) severErrorMsg = inputItem.message;
        }

        return (
          <Input
            ElementType={f.id === "message" ? "textarea" : "input"}
            key={f.id}
            label={f.label}
            id={f.id}
            type={f.type}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete ?? "off"}
            validator={f.validator}
            severErrorMsg={severErrorMsg}
            prevValue={""}
            help={f.help}
            submissionCount={submissionCountRef.current}
            formID="contact-form"
          />
        );
      })}

      {children}
      <button
        name="submit"
        className="btn"
        disabled={isSubmitting}
        onClick={() => submissionCountRef.current++}
      >
        {isSubmitting ? "submitting ..." : "send"}
      </button>
    </Form>
  );
}

export default ContactForm;
