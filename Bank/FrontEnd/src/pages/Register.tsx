import { ActionFunctionArgs, Link, redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Wrapper from "../assets/stylingWrappers/Register";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import { validateAllFields } from "../utils/validation";

function Register() {
  return (
    <Wrapper>
      <ToastContainer position="bottom-left" />
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
    const response = await fetch("http://localhost:3000/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 400) {
      const responseData = await response.json();
      return responseData;
    }
    toast.success("Registration successfully");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
