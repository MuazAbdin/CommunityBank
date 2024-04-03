import { ActionFunctionArgs } from "react-router-dom";
import Wrapper from "../assets/stylingWrappers/Contact";
import StyledContactForm from "../assets/stylingWrappers/StyledContactForm";
import { customAction } from "../utils/customAction";
import { validateContactFields } from "../utils/validation";

function Contact() {
  return (
    <Wrapper>
      <div>
        <StyledContactForm></StyledContactForm>
      </div>
    </Wrapper>
  );
}

export default Contact;

export async function action({ params, request }: ActionFunctionArgs) {
  return customAction({
    params,
    request,
    url: "contact",
    successMessage: "Message sent successfully",
    redirectPath: "/",
    preSubmitValidator: validateContactFields,
    specialErrors: [400], // BadRequestError (invalid inputs), Forbidden
  });
}
