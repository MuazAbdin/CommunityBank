import { ActionFunctionArgs, redirect } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { fetcher } from "./fetcher";
import { toast } from "react-toastify";
import { HTTPError } from "./cutomErrors";

interface ICustomAcionFunctionArgs extends ActionFunctionArgs {
  preSubmitValidator?: (fields: any) => {
    msg: string;
    data: {
      name: string;
      value: any;
      message: string;
    }[];
  };
  specialErrors?: number[];
  url: string;
  successMessage?: string;
  redirectPath?: string;
}

export async function customAction({
  params,
  request,
  url,
  successMessage = "Submitted successfully",
  redirectPath = "",
  preSubmitValidator = ([]) => ({ msg: "", data: [] }),
  specialErrors = [],
}: ICustomAcionFunctionArgs) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()].filter((entry) => entry[0] !== "submit")
  );
  console.log(data);
  const preSubmitValidation = preSubmitValidator(data);
  console.log(preSubmitValidation);
  if (preSubmitValidation.msg === "Invalid inputs") return preSubmitValidation;

  try {
    const response = await fetcher(url, {
      method: request.method,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      if (specialErrors.includes(response.status)) {
        const responseData = await response.json();
        toast.error(responseData?.msg || "Something went wrong");
        return responseData;
      }
      throw new HTTPError(response);
    }

    const responseData = await response.json();
    toast.success(responseData?.msg || successMessage);
    return redirect(redirectPath);
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      throw error;
    }
    console.log(error);
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
