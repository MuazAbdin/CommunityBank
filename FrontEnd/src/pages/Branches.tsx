import { FaBuildingColumns, FaLocationDot, FaPhone } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import Wrapper from "../assets/stylingWrappers/Branches";

const BANK_BRANCHES = [
  {
    title: "Community Bank",
    address: "Jerusalem, Community st. 13",
    phone: "02-1234567",
    email: "community.jr@bank.com",
  },
  {
    title: "Community Bank",
    address: "Tel Aviv, Beach st. 26",
    phone: "03-7654321",
    email: "community.ta@bank.com",
  },
  {
    title: "Community Bank",
    address: "Haifa, Main st. 3",
    phone: "04-8901234",
    email: "community.hf@bank.com",
  },
];

function Branches() {
  return (
    <Wrapper>
      <div>
        <h3 className="title">Branches</h3>
        <section className="branches-cards">
          {BANK_BRANCHES.map((b) => (
            <Branch key={b.phone} {...b} />
          ))}
        </section>
      </div>
    </Wrapper>
  );
}

export default Branches;

function Branch({
  title,
  address,
  phone,
  email,
}: {
  title: string;
  address: string;
  phone: string;
  email: string;
}) {
  return (
    <article className="branch-card">
      <div className="branch-card__item c-flex">
        <FaBuildingColumns />
        <span>{title}</span>
      </div>
      <div className="branch-card__item c-flex">
        <FaLocationDot />
        <span>{address}</span>
      </div>
      <div className="branch-card__item c-flex">
        <FaPhone />
        <span>{phone}</span>
      </div>
      <div className="branch-card__item c-flex">
        <TbMailFilled />
        <span>{email}</span>
      </div>
    </article>
  );
}
