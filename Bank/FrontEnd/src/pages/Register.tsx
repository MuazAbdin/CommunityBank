import { Form, Link } from "react-router-dom";
import Input from "../components/Input";
import Wrapper from "../assets/stylingWrappers/Register";
import {
  isAddressValid,
  isEmailValid,
  isFirstNameValid,
  isIDValid,
  isLastNameValid,
  isMobileValid,
  isPasswordConfirmValid,
  isPasswordValid,
} from "../utils/validation";
import { useRef } from "react";

function Register() {
  const insertedPassword = useRef<HTMLInputElement>();
  return (
    <Wrapper>
      <Form>
        <h3 className="title">Register</h3>
        <Input
          label="ID Card"
          id="IDcard"
          type="number"
          placeholder="ID Card"
          validator={isIDValid}
          help="An israeli ID card."
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          validator={isPasswordValid}
          ref={insertedPassword}
          help="6-12 characters.
                At least one lowercase, one uppercase, 
                one digit, one of #?!@$ %^&*- ."
        />
        <Input
          label="Confirm Password"
          id="passwordConfirm"
          type="password"
          placeholder="Confirm Password"
          validator={(value: string) =>
            isPasswordConfirmValid(insertedPassword.current!.value, value)
          }
        />
        <Input
          label="First Name"
          id="firstName"
          type="text"
          autoComplete="given-name"
          placeholder="First Name"
          validator={isFirstNameValid}
          help="must contain between 5-32 characters."
        />
        <Input
          label="Last Name"
          id="lastName"
          type="text"
          autoComplete="family-name"
          placeholder="Last Name"
          validator={isLastNameValid}
          help="must contain between 5-32 characters."
        />
        <Input
          label="Email"
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          validator={isEmailValid}
        />
        <Input
          label="Mobile"
          id="mobile"
          type="number"
          placeholder="Mobile"
          validator={isMobileValid}
          help="An israeli mobile number."
        />
        <Input
          label="City"
          id="city"
          type="text"
          placeholder="City"
          validator={isAddressValid}
        />
        <Input
          label="Street"
          id="street"
          type="text"
          placeholder="Street"
          validator={isAddressValid}
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
