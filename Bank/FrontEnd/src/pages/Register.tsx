import { Form } from "react-router-dom";
import Input from "../components/Input";
import Wrapper from "../assets/stylingWrappers/Register";

function Register() {
  return (
    <Wrapper>
      <Form>
        <h3 className="title">Register</h3>
      </Form>
    </Wrapper>
  );
}

export default Register;
