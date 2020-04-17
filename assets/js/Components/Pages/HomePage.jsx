import React, { useState } from "react";
import ChartCaseTotal from "../Charts/ChartCaseTotal";
import USNumber from "../Charts/USNumber";
import ChartBedNumber from "../Charts/ChartBedNumber";
import Table from "../Pages/Dashboard/Table";
import ChartCaseNumber from "../Charts/ChartCaseNumber";
import ChartUSNumber from "../Charts/ChartUSNumber";
import Header from "../Header";
import Datepicker from "../Pages/Dashboard/Datepicker";

const HomePage = () => {
    const [startDate, setStartDate] = useState(new Date());
    var date = Array(7);
    for(let i=0; i < date.length;i++){
        date[i] = new Date();
        date[i].setDate(startDate.getDate()-i)
        date[i] = date[i].getDate() + '/'+ (date[i].getMonth()+1);
    }
    
    return(
        <>
            <Header title={"Monitoring COVID2019"} other={Datepicker()}/>
            <div className="row">
                <ChartCaseTotal />
                <USNumber/>
                <ChartBedNumber />
                <Table date={date}/>
            </div>
            <div className="row">
                <ChartCaseNumber date={date}/>
                <ChartUSNumber/>
            </div>
        </>
    )
}

export default HomePage