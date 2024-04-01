import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "./Input";
import { LOAN_FIELDS, LOAN_MONTH_TERMS } from "../utils/constants";
import { PropsWithChildren, useRef } from "react";
import { ILoanFormProps, IUserFormActionData } from "../types/components";
import InputSelect from "./InputSelect";
import { isEmpty } from "../utils/validation";

function LoanForm({ className, children }: PropsWithChildren<ILoanFormProps>) {
  const actionData = useActionData() as IUserFormActionData;

  const submissionCountRef = useRef(0);

  let onSumbitSelectErrorMessage = "";
  if (actionData && actionData.data) {
    const inputItem = actionData.data.find((item) => item.name === "term");
    if (inputItem) onSumbitSelectErrorMessage = inputItem.message;
  }

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="POST" id="loan-form" className={className} noValidate>
      <h3 className="title">loan</h3>
      {LOAN_FIELDS.filter((f) => f.id !== "term").map((f) => {
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
            validator={f.validator}
            severErrorMsg={severErrorMsg}
            prevValue={""}
            help={f.help}
            hideVerifyIcon={f.hideVerifyIcon}
            submissionCount={submissionCountRef.current}
            formID="loan-form"
          />
        );
      })}

      <InputSelect
        label="Loan Term"
        id="term"
        validator={isEmpty}
        fields={LOAN_MONTH_TERMS}
        submissionCount={submissionCountRef.current}
        onSubmitErrorMessage={onSumbitSelectErrorMessage}
      />

      {children}

      <button
        name="submit"
        className="btn"
        disabled={isSubmitting}
        onClick={() => submissionCountRef.current++}
      >
        {isSubmitting ? "submitting ..." : "calculate"}
      </button>
    </Form>
  );
}

export default LoanForm;
