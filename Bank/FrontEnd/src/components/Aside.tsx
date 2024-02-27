import { FaFileInvoiceDollar, FaRegCircleUser } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Aside";
import Accordion from "./Accordion";

const PROFILE_SECTIONS = [
  { name: "overview", to: "" },
  { name: "edit details", to: "edit-details" },
  { name: "change password", to: "change-password" },
];
const ACCOUNTS: { name: string; to: string }[] = [];

function Aside() {
  return (
    <Wrapper>
      <nav>
        <Accordion>
          <Accordion.Item
            id="nav-profile"
            title="profile"
            Icon={FaRegCircleUser}
            subsectoins={PROFILE_SECTIONS}
          />
          <Accordion.Item
            id="nav-accounts"
            title="accounts"
            Icon={FaFileInvoiceDollar}
            subsectoins={ACCOUNTS}
          />
        </Accordion>
      </nav>
    </Wrapper>
  );
}

export default Aside;
