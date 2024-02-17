import { Form, Link } from "react-router-dom";
import Input from "../components/Input";
import Wrapper from "../assets/stylingWrappers/Register";

function Register() {
  return (
    <Wrapper>
      <Form>
        <h3 className="title">Register</h3>
        <Input
          label="ID Card"
          id="IDcard"
          type="number"
          placeholder="ID Card"
          error="ID is not valid"
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          error="not valid"
        />
        <Input
          label="Confirm Password"
          id="passwordConfirm"
          type="password"
          placeholder="Confirm Password"
          error=" not valid"
        />
        <Input
          label="First Name"
          id="firstName"
          type="text"
          autoComplete="given-name"
          placeholder="First Name"
          error="ID is not valid"
        />
        <Input
          label="Last Name"
          id="lastName"
          type="text"
          autoComplete="family-name"
          placeholder="Last Name"
          error="ID is not valid"
        />
        <Input
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          error="ID is not valid"
        />
        <Input
          label="Mobile"
          id="mobile"
          type="number"
          placeholder="Mobile"
          error="ID is not valid"
        />
        <Input
          label="City"
          id="city"
          type="text"
          placeholder="City"
          error="ID is not valid"
        />
        <Input
          label="Street"
          id="street"
          type="text"
          placeholder="Street"
          error="ID is not valid"
        />
        <div className="btn-group">
          <button className="btn reset">reset</button>
          <button className="btn">submit</button>
        </div>
        <div className="links-group">
          <Link to="../login">Already have an account?</Link>
        </div>
      </Form>
    </Wrapper>
  );
}

export default Register;
