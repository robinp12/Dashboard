import React, { useState } from "react";
import ChartCaseTotal from "../Charts/ChartCaseTotal";
import USNumber from "../Charts/USNumber";
import ChartBedNumber from "../Charts/ChartBedNumber";
import Table from "./DashboardPage/Table";
import ChartCaseNumber from "../Charts/ChartCaseNumber";
import ChartUSNumber from "../Charts/ChartUSNumber";
import Header from "../Header";
import Datepicker from "../DashboardPage/Datepicker";

const HomePage = () => {
    const date = Datepicker.getDate();
    return(
        <>
            <Header title={"Monitoring COVID2019"}/>
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