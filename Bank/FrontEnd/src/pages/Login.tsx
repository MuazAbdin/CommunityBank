import { ActionFunctionArgs, Link } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Login";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import { LOGIN_FIELDS } from "../utils/constants";
import { customAction } from "../utils/customAction";
import { validateLoginFields } from "../utils/validation";

function Login() {
  return (
    <Wrapper>
      <StyledUserForm
        formID="login-form"
        title="login"
        method="POST"
        buttonText="submit"
        fields={LOGIN_FIELDS}
      >
        <div className="links-group">
          <Link to="../register">Don't have an account?</Link>
          <Link to="/">Forgot your password?</Link>
        </div>
      </StyledUserForm>
    </Wrapper>
  );
}

export default Login;

export async function action({ params, request }: ActionFunctionArgs) {
  return customAction({
    params,
    request,
    url: "auth/login",
    successMessage: "Logged in successfully",
    redirectPath: "/dashboard",
    preSubmitValidator: validateLoginFields,
    specialErrors: [400, 401], // [invalid input, invalid credentials]
  });
}
