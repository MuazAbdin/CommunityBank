import { ActionFunctionArgs, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";

import Wrapper from "../assets/stylingWrappers/Register";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";

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
  console.log(data);
  if (Object.keys(data).filter((k) => data[k] === "").length > 0)
    return { result: "emptyFields" };

  try {
    const response = await fetch("http://localhost:3000/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
