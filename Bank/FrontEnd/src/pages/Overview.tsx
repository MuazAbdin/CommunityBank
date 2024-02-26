import { ActionFunctionArgs, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Overview";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import OverviewDetails from "../components/OverviewDetails";
import { fetcher } from "../utils/fetcher";
import { UserDetails } from "../interfaces/components";
import { CHANGE_PASSWORD_FIELDS, EDIT_USER_FIELDS } from "../utils/constants";
import { action as submitAction } from "../utils/submitAction";

function Overview() {
  const { user } = useLoaderData() as { user: UserDetails & any };
  console.log(user);
  const values = {
    IDcard: user.IDcard,
    firstName: user.name.first,
    lastName: user.name.last,
    email: user.email,
    mobile: user.mobile,
    city: user.address.city,
    street: user.address.street,
  };

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

// in the back end made get current middleware before all routes
export async function loader() {
  const response = await fetcher("/v1/users/current");
  if (!response.ok) throw response;
  return response;
}

export async function action({ params, request }: ActionFunctionArgs) {
  return submitAction({ params, request });
}
