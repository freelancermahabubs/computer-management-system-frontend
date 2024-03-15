import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatepickerHelper = ({selectedDate, handleDateChange, placeHolder}) => {
  return (
    <div>
      <DatePicker
       
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy" 
        placeholderText={placeHolder}
        className="form-control" 
      />
    </div>
  );
};

export default DatepickerHelper;
