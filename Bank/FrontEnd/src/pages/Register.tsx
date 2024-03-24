import { ActionFunctionArgs, Link, LoaderFunctionArgs } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Register";
import StyledUserForm from "../assets/stylingWrappers/StyledUserForm";
import { REGISTER_FIELDS } from "../utils/constants";
import { action as submitAction } from "../utils/submitAction";

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

export async function loader({ request }: LoaderFunctionArgs) {}

export async function action({ params, request }: ActionFunctionArgs) {
  return submitAction({ params, request });
}
