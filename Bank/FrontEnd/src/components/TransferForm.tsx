import { PropsWithChildren } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import Input from "./Input";
import { TRANSFER_FIELDS } from "../utils/constants";
import { ITransactionProps, IUserFormActionData } from "../types/components";
import DatePicker from "./DatePicker";
import InputSelect from "./InputSelect";

function TransferForm({
  className,
  values,
  children,
}: PropsWithChildren<{ className?: string; values?: ITransactionProps }>) {
  const actionData = useActionData() as IUserFormActionData;
  const isSubmitted = actionData?.msg === "Invalid inputs";

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
            prevValue={values?.[f.id] || ""}
            help={f.help}
            hideVerifyIcon={f.hideVerifyIcon}
            isSubmitted={isSubmitted}
            formID="transfer-form"
          />
        );
      })}

      <InputSelect />
      <DatePicker />

      {children}
      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : "transfer"}
      </button>
    </Form>
  );
}

export default TransferForm;
