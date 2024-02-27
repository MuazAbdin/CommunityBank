import { ActionFunctionArgs } from "react-router-dom";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import { CHANGE_PASSWORD_FIELDS } from "../utils/constants";
import { action as submitAction } from "../utils/submitAction";

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

export async function action({ params, request }: ActionFunctionArgs) {
  return submitAction({ params, request });
}
