import React from "react";
import Test from "../Test";
import ChartCaseTotal from "../Charts/ChartCaseTotal";
import USNumber from "../Charts/USNumber";
import ChartBedNumber from "../Charts/ChartBedNumber";
import Table from "../Table";
import ChartCaseNumber from "../Charts/ChartCaseNumber";
import ChartUSNumber from "../Charts/ChartUSNumber";
import Header from "../Header";

const HomePage = () => {
    return(
        <>
            <Header title={"Dashboard"}/>
            <div className="row">
                <Test/>
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