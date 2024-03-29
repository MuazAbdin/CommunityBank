import { LoaderFunctionArgs } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { fetcher } from "./fetcher";
import { toast } from "react-toastify";
import { HTTPError } from "./cutomErrors";

interface ICustomLoaderFunctionArgs extends LoaderFunctionArgs {
  url: string;
  specialErrors: number[];
}

export async function customLoader({
  params,
  request,
  url,
  specialErrors = [],
}: ICustomLoaderFunctionArgs) {
  try {
    const response = await fetcher(url);

    if (!response.ok) {
      if (specialErrors.includes(response.status)) {
        const responseData = await response.json();
        toast.error(responseData?.msg || "Something went wrong");
        return responseData;
      }
      throw new HTTPError(response);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
      throw error;
    }
    console.log(error);
    return error;
  }
}
