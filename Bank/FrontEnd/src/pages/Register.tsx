import { ActionFunctionArgs, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";

import Wrapper from "../assets/stylingWrappers/Register";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import { validateAllFields } from "../utils/validation";
import { fetcher } from "../utils/fetcher";

function Register() {
  return (
    <Wrapper>
      <StyledUserForm title="register" buttonText="submit">
        <div className="links-group">
          <Link to="../login">Already have an account?</Link>
        </div>
      </StyledUserForm>
    </Wrapper>
  );
}

export default Register;

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
    const response = await fetcher("v1/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (response.status === 400) {
      const responseData = await response.json();
      return responseData;
    }
    toast.success("Registered successfully");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
