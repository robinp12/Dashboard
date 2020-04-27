import React, { useState, useEffect } from 'react';
import externAPI from './Services/externAPI';
import ChartCaseTotal from './Charts/ChartCaseTotal';
import PageLoader from "./PageLoader";

const Test = () => {
    const [datas, setDatas] = useState([]);
    externAPI(3875).then(e=> {
            setDatas(e.datapoints);
    })
    return(<>
        {!datas && (<div className="text-center"><PageLoader/></div> ) || (  
        <>
        <h4>Données chargées !</h4>
        <ChartCaseTotal props={datas}/>
        </>
        )}
    </>)

}
export default Test;