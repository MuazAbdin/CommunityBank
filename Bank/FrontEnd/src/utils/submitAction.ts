import { ActionFunctionArgs, redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { validateForm } from "./validation";
import { fetcher } from "./fetcher";
import { toast } from "react-toastify";

export async function action({ request }: ActionFunctionArgs) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()].filter((entry) => entry[0] !== "submit")
  );
  console.log(data);
  const preSubmitValidation = validateForm(data);
  console.log(preSubmitValidation);
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
        redirectPath: "/login",
      };
    case 7:
      return {
        name: "editDetails",
        url: "",
        successMessage: "Updated successfully",
        redirectPath: "/dashboard",
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
