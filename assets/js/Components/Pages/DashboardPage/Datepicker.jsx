import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = () => {
    const [startDate, setStartDate] = useState(new Date());
       return (                 
        <DatePicker className="date text-center p-1 text-muted bg-light" 
            selected={startDate} 
            onChange={date => {setStartDate(date);}}
            dateFormat="d/MM/yyyy"
        />
    );
}
 
export default Datepicker;