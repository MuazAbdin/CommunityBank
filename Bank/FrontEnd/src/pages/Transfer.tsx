import { ActionFunctionArgs } from "react-router-dom";
import StyledTransferForm from "../assets/stylingWrappers/StyledTransferForm";
import Input from "../components/Input";

const CATEGORIES = [
  "Entertainment",
  "Food",
  "Government",
  "Healthcare",
  "Housing",
  "Insurance",
  "Miscellaneous",
  "Payments",
  "Salary",
  "Transportation",
];

function Transfer() {
  return (
    <section className="account-subsection-container">
      <StyledTransferForm>
        {/* <label htmlFor="category">Category: </label> */}
        <fieldset>
          <select
            id="category"
            name="category"
            required
            defaultValue="Choose a category ..."
          >
            <option value="Choose a category ..." disabled>
              Choose a category ...
            </option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </fieldset>
        <Input
          label="Transfer on"
          id="transferOn"
          type="date"
          placeholder="Transfer on"
          autoComplete="off"
          formID="transfer-form"
          min={new Date().toLocaleDateString("fr-ca")}
        />
      </StyledTransferForm>
    </section>
  );
}

export default Transfer;

export async function action({ params, request }: ActionFunctionArgs) {
  const fd = await request.formData();
  const data = Object.fromEntries(
    [...fd.entries()].filter((entry) => entry[0] !== "submit")
  );
  console.log(data);
  // const preSubmitValidation = validateForm(data);
  // console.log(preSubmitValidation);
  // if (preSubmitValidation.msg === "Invalid inputs") return preSubmitValidation;

  // const { url, successMessage, redirectPath } = getFormMetadata(data);
  // try {
  //   const response = await fetcher(url, {
  //     method: request.method,
  //     body: JSON.stringify(data),
  //   });

  //   if (response.status === 400) {
  //     const responseData = await response.json();
  //     return responseData;
  //   }

  //   // if (response.status === 401) {
  //   //   const data = await response.json();
  //   //   toast.error("Login Failed");
  //   //   return data;
  //   // }

  //   toast.success(successMessage);
  //   return redirect(redirectPath);
  // } catch (error) {
  //   toast.error(error?.response?.data?.msg);
  //   return error;
  // }

  return null;
}
