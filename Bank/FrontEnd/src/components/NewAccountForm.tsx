import { ChangeEvent, useState } from "react";
import { Form, useNavigation } from "react-router-dom";

type accountType = "checking" | "savings";

function NewAccountForm({ className }: { className?: string }) {
  const [accountType, setAccountType] = useState<accountType>("checking");

  const changeSelection = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value as accountType;
    setAccountType(inputValue);
  };

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="POST" className={className} noValidate>
      <h3 className="title">new account</h3>
      <p>Select account type:</p>
      <fieldset>
        <div className="d-selector">
          <input
            type="radio"
            id="checking"
            name="type"
            value="checking"
            onChange={changeSelection}
            checked={accountType === "checking"}
          />
          <label htmlFor="checking">checking</label>
        </div>
        <div className="d-selector">
          <input
            type="radio"
            id="savings"
            name="type"
            value="savings"
            onChange={changeSelection}
            checked={accountType === "savings"}
          />
          <label htmlFor="savings">savings</label>
        </div>
      </fieldset>
      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : "submit"}
      </button>
    </Form>
  );
}

export default NewAccountForm;
