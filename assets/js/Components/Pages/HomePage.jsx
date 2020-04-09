import React from "react";
import ChartCaseTotal from "../Charts/ChartCaseTotal";
import USNumber from "../Charts/USNumber";
import ChartBedNumber from "../Charts/ChartBedNumber";
import Table from "../Table";
import ChartCaseNumber from "../Charts/ChartCaseNumber";
import ChartUSNumber from "../Charts/ChartUSNumber";
import Header from "../Header";
import Datepicker from "../Datepicker";

const HomePage = () => {
    return(
        <>
            <Header title={"Dashboard"} other={<Datepicker/>}/>
            <div className="row">
                <ChartCaseTotal />
                <USNumber/>
                <ChartBedNumber />
                <Table/>
            </div>
            <div className="row">
                <ChartCaseNumber />
                <ChartUSNumber/>
            </div>
        </>
    )
}

export default HomePage