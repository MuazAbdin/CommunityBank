import { Outlet, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/DashboardLayout";
import Aside from "../components/Aside";
import PageHeader from "../components/PageHeader";
import { UserDetails } from "../interfaces/components";
import { fetcher } from "../utils/fetcher";

function DashboardLayout() {
  const { user } = useLoaderData() as { user: UserDetails & any };
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
      <Aside />
      <PageHeader name={`${values.firstName} ${values.lastName}`} />
      <Outlet context={values} />
    </Wrapper>
  );
}

export default DashboardLayout;

// in the back end made get current middleware before all routes
export async function loader() {
  const response = await fetcher("/v1/users/current");
  if (!response.ok) throw response;
  return response;
}
