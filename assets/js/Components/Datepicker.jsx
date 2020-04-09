import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Datepicker = () => {
    const [startDate, setStartDate] = useState(new Date());

   var date = [new Date(), new Date(), new Date(), new Date()];
   for(let e=0; e < date.length;e++){
       if(e==3){
        date[date.length-1].setDate(date[date.length-2].getDate()+1);
       }
       else{
        date[e+1].setDate(date[e].getDate()+1);
       }       
   }
   console.log(date)
    return (                 
        <DatePicker className="date text-center p-1 text-muted bg-light" 
        selected={startDate} 
        onChange={date => setStartDate(date)}
        dateFormat="d/MM/yyyy"
        />
    );
}
 
export default Datepicker;