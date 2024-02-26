import { ActionFunctionArgs, redirect, useLoaderData } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Overview";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import OverviewDetails from "../components/OverviewDetails";
import { fetcher } from "../utils/fetcher";
import { UserDetails } from "../interfaces/components";
import { validateAllFields } from "../utils/validation";
import { toast } from "react-toastify";

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

// in the back end made get current middleware before all routes
export async function loader() {
  const response = await fetcher("/v1/users/current");
  if (!response.ok) throw response;
  return response;
}

export async function action({ request }: ActionFunctionArgs) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()].filter((entry) => entry[0] !== "submit")
  );
  // console.log(data);
  const preSubmitValidation = validateAllFields(data);
  // console.log(preSubmitValidation);
  if (preSubmitValidation.msg === "Invalid inputs") return preSubmitValidation;

  try {
    const response = await fetcher("v1/users/current", {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (response.status === 400) {
      const responseData = await response.json();
      return responseData;
    }
    return toast.success("Updated successfully");
    // return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
