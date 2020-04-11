import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = () => {
    const [startDate, setStartDate] = useState(new Date());

    var date = Array(3);
    for(let i=0; i < date.length;i++){
        date[i] = new Date();
        date[i].setDate(startDate.getDate()+i)
        date[i] = date[i].toLocaleDateString();
    }
    console.log(date);
       return (                 
        <DatePicker className="date text-center p-1 text-muted bg-light" 
        selected={startDate} 
        onChange={date => {setStartDate(date);
            parent(startDate)}}
        dateFormat="d/MM/yyyy"
        />
    );
}
 
export default Datepicker;