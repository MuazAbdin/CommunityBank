import { FaMagnifyingGlass } from "react-icons/fa6";
import { Form } from "react-router-dom";

function Search({ className }: { className?: string }) {
  return (
    <Form className={className}>
      <fieldset className="text-search">
        <input type="text" id="search" name="search" placeholder="Search" />
        <button className="btn">
          <FaMagnifyingGlass />
        </button>
      </fieldset>
      <fieldset className="date-search">
        <label htmlFor="from">from:</label>
        <input type="date" id="from" name="from" />
        <label htmlFor="to">to:</label>
        <input type="date" id="to" name="to" />
      </fieldset>
    </Form>
  );
}

export default Search;
