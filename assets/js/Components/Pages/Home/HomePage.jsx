import React, { useEffect, useState } from "react";
import Header from "../../Header";
import PageLoader from "../../PageLoader";
import authAPI from "../../Services/authAPI";
import cache from "../../Services/cache";
import externAPI from "../../Services/externAPI";
import ChartBedNumber from "./Charts/ChartBedNumber";
import ChartCaseNumber from "./Charts/ChartCaseNumber";
import ChartCaseTotal from "./Charts/ChartCaseTotal";
import ChartUSNumber from "./Charts/ChartUSNumber";
import USNumber from "./Charts/USNumber";
import Table from "./DashboardComponents/Table";

const HomePage = () => {
  const [datasSuspect, setDatasSuspect] = useState([]);
  const [datasAveree, setDatasAveree] = useState([]);
  const [datasReserve, setDatasReserve] = useState([]);
  const [datasOccupe, setDatasOccupe] = useState([]);
  const [fake, setFake] = useState(false);

  useEffect(() => {
    //COVID AVEREES
    externAPI(3874).then((e) => {
      cache.get("ref3874").then((e) => {
        setDatasAveree(e);
      });
    });
    //COVID SUSPECTS
    externAPI(3875).then(() => {
      cache.get("ref3875").then((e) => {
        setDatasSuspect(e);
      });
    });
    //LIT RESERVE
    externAPI(3876).then(() => {
      cache.get("ref3876").then((e) => {
        setDatasReserve(e);
      });
    });
    //LIT OCCUPE
    externAPI(3877).then(() => {
      cache.get("ref3877").then((e) => {
        setDatasOccupe(e);
      });
    });
  }, []);

  return (
    <>
      {(typeof (
        datasAveree[0] &&
        datasSuspect[0] &&
        datasReserve[0] &&
        datasOccupe[0]
      ) == "undefined" && (
        <div className="text-center">
          <PageLoader />
        </div>
      )) || (
        <>
          <Header
            title={"Monitoring COVID19"}
            center={cache.lastUpdate("ref3874")}
            right={
              authAPI.isAdmin() && (
                <div
                  className="btn btn-secondary float-right"
                  onClick={() => setFake(!fake)}
                >
                  {!fake ? "Fausses données" : "Vraies données"}
                </div>
              )
            }
          />
          {console.log(datasAveree[0], datasOccupe[0])}
          {!fake && (
            <>
              <div className="row">
                <ChartCaseTotal
                  suspect={datasSuspect[0]}
                  averee={datasAveree[0]}
                />
                <USNumber suspect={datasSuspect} averee={datasAveree} />
                <ChartBedNumber
                  occupe={datasOccupe[0]}
                  reserve={datasReserve[0]}
                />
                <Table suspect={datasSuspect} averee={datasAveree} />
              </div>
              <div className="row">
                <ChartCaseNumber
                  suspect={datasSuspect[0]}
                  averee={datasAveree[0]}
                />
                <ChartUSNumber
                  suspect={datasSuspect[0]}
                  averee={datasAveree[0]}
                />
              </div>
            </>
          )}
          {/* fake data */}
          {fake && (
            <>
              <div className="row">
                <ChartCaseTotal />
                <USNumber />
                <ChartBedNumber />
                <Table />
              </div>
              <div className="row">
                <ChartCaseNumber />
                <ChartUSNumber />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
