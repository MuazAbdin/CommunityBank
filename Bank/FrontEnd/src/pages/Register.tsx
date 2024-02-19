import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../components/Input";
import Wrapper from "../assets/stylingWrappers/Register";
import { useRef } from "react";
import { REGISTER_FIELDS } from "../utils/constants";

function Register() {
  const actionData = useActionData() as { result: string };
  const insertedPassword = useRef<HTMLInputElement>();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="POST" id="register-form" noValidate>
        <h3 className="title">Register</h3>
        {REGISTER_FIELDS.map((f) => {
          const validator =
            f.id === "passwordConfirm"
              ? (value: string) =>
                  f.validator(insertedPassword.current!.value, value)
              : f.validator;

          return (
            <Input
              key={f.id}
              label={f.label}
              id={f.id}
              type={f.id}
              autoComplete={f.autoComplete ?? null}
              ref={f.id === "password" ? insertedPassword : null}
              placeholder={f.placeholder}
              validator={validator}
              help={f.help}
              isSubmitted={actionData?.result === "emptyFields"}
            />
          );
        })}

        <div className="btn-group">
          {/* <button name="reset" className="btn reset">
            reset
          </button> */}
          <button name="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "submitting ..." : "submit"}
          </button>
        </div>
        <div className="links-group">
          <Link to="../login">Already have an account?</Link>
        </div>
      </Form>
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
