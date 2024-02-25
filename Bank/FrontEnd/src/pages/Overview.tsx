import { useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Overview";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import OverviewDetails from "../components/OverviewDetails";
import { fetcher } from "../utils/fetcher";
import { UserDetails } from "../interfaces/components";

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
      <StyledUserForm title="edit details" buttonText="save" values={values} />
    </Wrapper>
  );
}

export default Overview;

export async function loader() {
  const response = await fetcher("/v1/users/current");
  if (!response.ok) throw response;
  return response;
}
