import { FaBuildingColumns, FaLocationDot, FaPhone } from "react-icons/fa6";
import Wrapper from "../assets/stylingWrappers/Contact";
import { TbMailFilled } from "react-icons/tb";

function Contact() {
  return (
    <Wrapper>
      <div>
        <div className="title">Contact Us</div>
        <div className="contact-item c-flex">
          <FaBuildingColumns />
          <span>Community Bank</span>
        </div>
        <div className="contact-item c-flex">
          <FaLocationDot />
          <span>Jerusalem, Community st. 13</span>
        </div>
        <div className="contact-item c-flex">
          <FaPhone />
          <span>02-1234567</span>
        </div>
        <div className="contact-item c-flex">
          <TbMailFilled />
          <span>community@bank.com</span>
        </div>
      </div>
    </Wrapper>
  );
}

export default Contact;
