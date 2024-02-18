import { Form, Link } from "react-router-dom";
import Input from "../components/Input";
import Wrapper from "../assets/stylingWrappers/Login";
import { isIDValid } from "../utils/validation";

function Login() {
  return (
    <Wrapper>
      <Form>
        <h3 className="title">Login</h3>
        <Input
          label="ID Card"
          id="IDcard"
          type="number"
          placeholder="ID Card"
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
        />
        <div className="btn-group">
          {/* <button className="btn reset">reset</button> */}
          <button className="btn">submit</button>
        </div>
        <div className="links-group">
          <Link to="../register">Don't have an account?</Link>
          <Link to="/">Forgot your password?</Link>
        </div>
      </Form>
    </Wrapper>
  );
}

export default Login;
