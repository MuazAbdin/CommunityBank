import { ActionFunctionArgs } from "react-router-dom";
import StyledTransferForm from "../assets/stylingWrappers/StyledTransferForm";
import { customAction } from "../utils/customAction";
import { validateTrnasferFields } from "../utils/validation";

function Transfer() {
  return (
    <section className="account-subsection-container">
      <StyledTransferForm />
    </section>
  );
}

export default Transfer;

export async function action({ params, request }: ActionFunctionArgs) {
  return customAction({
    params,
    request,
    url: `transactions/${params.number}`,
    successMessage: "Transfered successfully",
    redirectPath: "..",
    preSubmitValidator: validateTrnasferFields,
    specialErrors: [400, 401], // BadRequestError (invalid inputs), Forbidden
  });
}
