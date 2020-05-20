import React, { useState, useEffect, useRef, forwardRef } from "react";
import ChartCaseTotal from "../Charts/ChartCaseTotal";
import USNumber from "../Charts/USNumber";
import ChartBedNumber from "../Charts/ChartBedNumber";
import Table from "../DashboardPage/Table";
import ChartCaseNumber from "../Charts/ChartCaseNumber";
import ChartUSNumber from "../Charts/ChartUSNumber";
import Header from "../Header";
import Datepicker from "../DashboardPage/Datepicker";
import externAPI from "../Services/externAPI";
import PageLoader from "../PageLoader";
import SelectUsers from "../Forms/SelectUsers";
import authAPI from "../Services/authAPI";
import cache from "../Services/cache";

const HomePage = () => {
    const [datas, setDatas] = useState([]);
    const [show, setShow] = useState(false);
    const ref = useRef();
    const date = Datepicker.getDate();
    externAPI(3874).then( e=> { 
        // setDatas(e)
        setShow(true)
    })
    let o = [...datas]
    // o.map(e=> console.log(e.name_reference))
    return(
        <>
            {!show&& (<div className="text-center"><PageLoader/></div> ) || (  
            <>
                <Header title={"Monitoring COVID19"} center={cache.lastUpdate("datas")} right={authAPI.isAdmin()?<SelectUsers onChange={(e) => {console.log(e.currentTarget.value)}} defaut={authAPI.getCurrent().firstName + " " + authAPI.getCurrent().lastName}/>:<></>}/>
                <div className="row">
                    <ChartCaseTotal datas={datas} />
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