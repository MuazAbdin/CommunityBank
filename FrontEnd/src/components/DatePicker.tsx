import { useState } from "react";
import { default as ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Wrapper from "../assets/stylingWrappers/DatePicker";

function DatePicker() {
  const [transferDate, setTransferDate] = useState(new Date());
  return (
    <Wrapper>
      <ReactDatePicker
        showIcon
        toggleCalendarOnIconClick
        id="date"
        name="date"
        placeholderText="Transfer On"
        selected={transferDate}
        onChange={(date: Date) => setTransferDate(date)}
        closeOnScroll={true}
        minDate={new Date()}
      >
        <div style={{ color: "red" }}>
          When do you want to transfer the money?
        </div>
      </ReactDatePicker>
    </Wrapper>
  );
}

export default DatePicker;
