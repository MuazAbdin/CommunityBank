import { ActionFunctionArgs, Link, redirect } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Register";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import { LOGIN_FIELDS, REGISTER_FIELDS } from "../utils/constants";
import { validateAllFields } from "../utils/validation";
import { fetcher } from "../utils/fetcher";
import { toast } from "react-toastify";
import { action as submitFormAction } from "../components/UserDetailsForm";

function Register() {
  return (
    <Wrapper>
      <StyledUserForm
        formID="register-form"
        title="register"
        method="POST"
        buttonText="submit"
        fields={REGISTER_FIELDS}
      >
        <div className="links-group">
          <Link to="../login">Already have an account?</Link>
        </div>
      </StyledUserForm>
    </Wrapper>
  );
}

export default Register;

export async function action({ params, request }: ActionFunctionArgs) {
  return submitFormAction({ params, request });
}
