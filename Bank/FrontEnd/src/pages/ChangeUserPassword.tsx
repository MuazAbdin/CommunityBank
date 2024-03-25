import { ActionFunctionArgs } from "react-router-dom";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import { CHANGE_PASSWORD_FIELDS } from "../utils/constants";
import { customAction } from "../utils/customAction";
import { validateChangePasswordFields } from "../utils/validation";

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
  return customAction({
    params,
    request,
    url: "",
    successMessage: "Changed successfully",
    redirectPath: "/dashboard",
    preSubmitValidator: validateChangePasswordFields,
    specialErrors: [400], // BadRequestError (invalid inputs)
  });
}
