import { PropsWithChildren, useRef } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "./Input";
import { TRANSFER_FIELDS } from "../utils/constants";
import { ITransactionProps, IUserFormActionData } from "../types/components";
import DatePicker from "./DatePicker";
import InputSelect from "./InputSelect";
import { isEmpty } from "../utils/validation";

function TransferForm({
  className,
  values,
  children,
}: PropsWithChildren<{ className?: string; values?: ITransactionProps }>) {
  const actionData = useActionData() as IUserFormActionData;

  // const isSubmitted = actionData?.msg === "Invalid inputs";
  const submissionCountRef = useRef(0);
  // const isSubmitted = !!actionData;

  let onSumbitSelectErrorMessage = "";
  if (actionData && actionData.data) {
    const inputItem = actionData.data.find((item) => item.name === "category");
    if (inputItem) onSumbitSelectErrorMessage = inputItem.message;
  }

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="POST" id="transfer-form" className={className} noValidate>
      <h3 className="title">transfer</h3>
      {TRANSFER_FIELDS.map((f) => {
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
            // isSubmitted={isSubmitted}
            submissionCount={submissionCountRef.current}
            formID="transfer-form"
          />
        );
      })}
      <InputSelect
        label="Category"
        id="category"
        validator={isEmpty}
        // isSubmitted={isSubmitted}
        submissionCount={submissionCountRef.current}
        onSubmitErrorMessage={onSumbitSelectErrorMessage}
      />
      <DatePicker />
      {children}
      <button
        name="submit"
        className="btn"
        disabled={isSubmitting}
        onClick={() => submissionCountRef.current++}
      >
        {isSubmitting ? "submitting ..." : "transfer"}
      </button>
    </Form>
  );
}

export default TransferForm;
