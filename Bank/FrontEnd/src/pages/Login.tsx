import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Input from "../components/Input";
import Wrapper from "../assets/stylingWrappers/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const actionData = useActionData() as { result: string };

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <ToastContainer position="bottom-left" />
      <Form method="POST" id="login-form" noValidate>
        <h3 className="title">Login</h3>
        <Input
          label="ID Card"
          id="IDcard"
          type="number"
          placeholder="ID Card"
          // validator={isIDValid}
          // isSubmitted={actionData?.result === "emptyFields"}
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          // validator={isPasswordValid}
          // isSubmitted={actionData?.result === "emptyFields"}
        />
        <div className="btn-group">
          {/* <button className="btn reset">reset</button> */}
          <button name="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "submitting ..." : "submit"}
          </button>
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

export async function action({ request }: ActionFunctionArgs) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()].filter((entry) => entry[0] !== "submit")
  );
  console.log(data);
  if (Object.keys(data).filter((k) => data[k] === "").length > 0)
    return { result: "emptyFields" };

  try {
    // const response = await fetch("http://localhost:3000/v1/auth/register", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: { "Content-Type": "application/json" },
    // });
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
