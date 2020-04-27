import React, { useState, useEffect } from "react";
import ChartCaseTotal from "../Charts/ChartCaseTotal";
import USNumber from "../Charts/USNumber";
import ChartBedNumber from "../Charts/ChartBedNumber";
import Table from "../DashboardPage/Table";
import ChartCaseNumber from "../Charts/ChartCaseNumber";
import ChartUSNumber from "../Charts/ChartUSNumber";
import Header from "../Header";
import Datepicker from "../DashboardPage/Datepicker";
import authAPI from "../Services/authAPI";
import externAPI from "../Services/externAPI";
import PageLoader from "../PageLoader";

const HomePage = () => {
    const [datas, setDatas] = useState([]);
    const [ref, setRef] = useState([1]);
    const date = Datepicker.getDate();
    useEffect(()=>{
        console.log(authAPI.getCurrent());
        externAPI.getReference()
    },[])
    return(
        <>
            {!datas&& (<div className="text-center"><PageLoader/></div> ) || (  
            <>
            {    externAPI.getReference()}
                <Header title={"Monitoring COVID19"}/>
                <div className="row">
                    <ChartCaseTotal props={datas} />
                    <USNumber/>
                    <ChartBedNumber />
                    <Table date={date}/>
                </div>
                <div className="row">
                    <ChartCaseNumber date={date}/>
                    <ChartUSNumber/>
                </div>
            </>)}
        </>
    )
}

export default HomePage