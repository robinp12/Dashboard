import React from "react";

const Table = ({ suspect, averee }) => {
  let d;
  let c;
  let b;
  let days = [];
  let concatDay;
  if (typeof (suspect && averee) != "undefined") {
    concatDay = new Date(suspect[0].date);
    d = 10;
    c = 8;
    b = 5;
  } else {
    concatDay = new Date();
    d = 18;
    c = 12;
    b = 13;
  }
  for (let i = 0; i <= 2; i++) {
    days[i] = concatDay.getDate() - i + "/" + (concatDay.getMonth() + 1);
  }
  return (
    <>
      <div className="col-md-5 col-xs-12 col-sm-12 card">
        <div className="card-header">Statistiques récentes</div>
        <div className="card-body">
          <table id="table" className="table table-hover table-sm">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Cas entrants</th>
                <th scope="col">Cas soins intensifs</th>
                <th scope="col">Décès</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">{days[0]}</th>
                <td>{d++}</td>
                <td>{c++}</td>
                <td>{b++}</td>
              </tr>
              <tr>
                <th scope="row">{days[1]}</th>
                <td>{d + 2}</td>
                <td>{c + 3}</td>
                <td>{b + 4}</td>
              </tr>
              <tr>
                <th scope="row">{days[2]}</th>
                <td>{d + 3}</td>
                <td>{c + 4}</td>
                <td>{b + 5}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
