import { ActionFunctionArgs, useOutletContext } from "react-router-dom";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import { IUserProfileContext } from "../types/components";
import { EDIT_USER_FIELDS } from "../utils/constants";
import { customAction } from "../utils/customAction";
import { validateEditUserDetailsFields } from "../utils/validation";

function EditUserDetails() {
  const { userValues } = useOutletContext<IUserProfileContext>();
  return (
    <section className="content">
      <StyledUserForm
        formID="editDetails-form"
        title="edit details"
        method="PATCH"
        buttonText="save"
        values={userValues}
        fields={EDIT_USER_FIELDS}
      />
    </section>
  );
}

export default EditUserDetails;

export async function action({ params, request }: ActionFunctionArgs) {
  return customAction({
    params,
    request,
    url: "users/current/details",
    successMessage: "Updated successfully",
    redirectPath: "/dashboard",
    preSubmitValidator: validateEditUserDetailsFields,
    specialErrors: [400], // BadRequestError (invalid inputs)
  });
}
