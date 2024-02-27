import { Form, useNavigation } from "react-router-dom";

function NewAccountForm({ className }: { className?: string }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form className={className} noValidate>
      <h3 className="title">new account</h3>
      <p>Select account type:</p>
      <fieldset>
        <div className="d-selector">
          <input
            type="radio"
            id="checking"
            name="account-type"
            value="checking"
          />
          <label htmlFor="checking">checking</label>
        </div>
        <div className="d-selector">
          <input
            type="radio"
            id="savings"
            name="account-type"
            value="savings"
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
