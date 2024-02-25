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
import "react-toastify/dist/ReactToastify.css";
import { IUserFormActionData } from "../interfaces/components";
import { toast } from "react-toastify";

function Login() {
  const actionData = useActionData() as IUserFormActionData;
  // console.log(actionData);
  let IDcardErrorMessage = "";
  let passwordErrorMessage = "";
  if (actionData?.data) {
    const IDcardInput = actionData.data.find((item) => item.name === "IDcard");
    if (IDcardInput) IDcardErrorMessage = IDcardInput.message;
    const passwordInput = actionData.data.find(
      (item) => item.name === "password"
    );
    if (passwordInput) passwordErrorMessage = passwordInput.message;
  }

  const invalidCredentials = actionData?.msg === "invalid credentials";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="POST" id="login-form" noValidate>
        <h3 className="title">Login</h3>
        {invalidCredentials && (
          <div className="invalid-credentials">{actionData?.msg}</div>
        )}
        <Input
          label="ID Card"
          id="IDcard"
          type="number"
          placeholder="ID Card"
          autoComplete="off"
          severErrorMsg={IDcardErrorMessage}
          isSubmitted={actionData?.msg === "Invalid inputs"}
          formID="login-form"
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Password"
          autoComplete="off"
          severErrorMsg={passwordErrorMessage}
          isSubmitted={actionData?.msg === "Invalid inputs"}
          formID="login-form"
        />
        <button name="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "submitting ..." : "submit"}
        </button>
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
  const missedFields = Object.keys(data).filter((k) => data[k] === "");
  if (missedFields.length > 0) {
    return {
      msg: "Invalid inputs",
      data: missedFields.map((k) => {
        return { name: k, value: "", message: "required" };
      }),
    };
  }

  try {
    const response = await fetch("http://localhost:3000/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 400) {
      const responseData = await response.json();
      return responseData;
    }
    if (response.status === 401) {
      const data = await response.json();
      toast.error("Login Failed");
      return data;
    }
    toast.success("Logged in successfully");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
