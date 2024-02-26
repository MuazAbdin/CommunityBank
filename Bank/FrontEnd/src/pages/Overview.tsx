import { ActionFunctionArgs, useOutletContext } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Overview";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import OverviewDetails from "../components/OverviewDetails";
import { UserDetails } from "../interfaces/components";
import { CHANGE_PASSWORD_FIELDS, EDIT_USER_FIELDS } from "../utils/constants";
import { action as submitAction } from "../utils/submitAction";

function Overview() {
  const values = useOutletContext<UserDetails>();
  return (
    <Wrapper>
      <OverviewDetails />
      <StyledUserForm
        formID="editDetails-form"
        title="edit details"
        method="PATCH"
        buttonText="save"
        values={values}
        fields={EDIT_USER_FIELDS}
      />
      <StyledUserForm
        formID="changePassword-form"
        title="change password"
        method="PATCH"
        buttonText="save"
        fields={CHANGE_PASSWORD_FIELDS}
      />
    </Wrapper>
  );
}

export default Overview;

export async function action({ params, request }: ActionFunctionArgs) {
  return submitAction({ params, request });
}
