import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import Input from "./Input";
import { PropsWithChildren, useRef } from "react";
import {
  IUserDetailsFormProps,
  IUserFormActionData,
} from "../interfaces/components";
import { validateAllFields } from "../utils/validation";
import { fetcher } from "../utils/fetcher";
import { toast } from "react-toastify";
import { LOGIN_FIELDS, REGISTER_FIELDS } from "../utils/constants";

function UserDetailsForm({
  formID,
  title,
  method,
  buttonText,
  className,
  fields,
  values,
  children,
}: PropsWithChildren<IUserDetailsFormProps>) {
  const actionData = useActionData() as IUserFormActionData;
  const insertedPassword = useRef<HTMLInputElement>();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  // const fields = getFormFields(formID);

  return (
    <Form method={method} id={formID} className={className} noValidate>
      <h3 className="title">{title}</h3>
      {fields.map((f) => {
        const validator =
          f.id === "passwordConfirm"
            ? (value: string) =>
                f.validator!(insertedPassword.current?.value || "", value)
            : f.validator;

        let severErrorMsg = "";
        if (actionData && actionData.data) {
          const inputItem = actionData.data.find((item) => item.name === f.id);
          if (inputItem) severErrorMsg = inputItem.message;
        }

        return (
          <Input
            key={f.id}
            label={f.label}
            id={f.id}
            type={f.type}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete ?? "off"}
            ref={f.id === "password" ? insertedPassword : null}
            validator={validator}
            severErrorMsg={severErrorMsg}
            prevValue={values?.[f.id] || ""}
            help={f.help}
            isSubmitted={actionData?.msg === "Invalid inputs"}
            disabled={f.disabled}
            formID={formID}
          />
        );
      })}
      <button name="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? "submitting ..." : `${buttonText}`}
      </button>
      {children}
    </Form>
  );
}

export default UserDetailsForm;

export async function action({ request }: ActionFunctionArgs) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()].filter((entry) => entry[0] !== "submit")
  );
  // console.log(data);
  // const preSubmitValidation = validateForm(data);
  const preSubmitValidation = validateAllFields(data);
  // console.log(preSubmitValidation);
  if (preSubmitValidation.msg === "Invalid inputs") return preSubmitValidation;

  const { url, successMessage, redirectPath } = getFormMetadata(data);
  try {
    const response = await fetcher(url, {
      method: request.method,
      body: JSON.stringify(data),
    });

    if (response.status === 400) {
      const responseData = await response.json();
      return responseData;
    }

    // if (response.status === 401) {
    //   const data = await response.json();
    //   toast.error("Login Failed");
    //   return data;
    // }

    toast.success(successMessage);
    return redirect(redirectPath);
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

function getFormMetadata(fields: any) {
  const fieldsKeys = Object.keys(fields);
  switch (fieldsKeys.length) {
    case 2: // login
      return {
        name: "login",
        url: "/v1/auth/login",
        successMessage: "Logged in successfully",
        redirectPath: "/dashboard",
      };
    case 3:
      return {
        name: "changePassword",
        url: "",
        successMessage: "Changed successfully",
        redirectPath: "/",
      };
    case 7:
      return {
        name: "editDetails",
        url: "",
        successMessage: "Updated successfully",
        redirectPath: "/",
      };
    default:
      return {
        name: "register",
        url: "v1/auth/register",
        successMessage: "Registered successfully",
        redirectPath: "/login",
      };
  }
}

function getFormFields(formID: string) {
  switch (formID) {
    case "login-form":
      return LOGIN_FIELDS;
    default:
      return REGISTER_FIELDS;
  }
}
