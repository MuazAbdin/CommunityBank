import { ActionFunctionArgs } from "react-router-dom";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import { CHANGE_PASSWORD_FIELDS } from "../utils/constants";

function ChangeUserPassword() {
  return (
    <section className="content">
      <StyledUserForm
        formID="changePassword-form"
        title="change password"
        method="PATCH"
        buttonText="save"
        fields={CHANGE_PASSWORD_FIELDS}
      />
    </section>
  );
}

export default ChangeUserPassword;
