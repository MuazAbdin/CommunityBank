import { Error } from "mongoose";

function getFieldName(path: string) {
  if (path === "name.first") return "first name";
  if (path === "name.last") return "last name";
  if (path === "address.city") return "city";
  if (path === "address.street") return "street";
  return path;
}

function getErrorMessage(errorType: string, path: string) {
  if (errorType === "required") return `${path} is required`;
  return `${path} is invalid`;
}

export function handleDBErrors(err: Error.ValidationError) {
  console.log(err);
  const errors: any = [];
  // @ts-ignore
  Object.values(err.errors).forEach(({ properties }) => {
    console.log(properties);
    const name = getFieldName(properties.path);
    const value = properties.value;
    const message = getErrorMessage(properties.type, name);
    errors.push({ name, value, message });
  });

  return errors;
}
