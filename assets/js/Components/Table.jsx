import React from 'react';

const Table = () => {
    let dates = [ new Date(2020, 2, 31).toLocaleDateString(),new Date(2020, 3, 1).toLocaleDateString(),new Date(2020, 3, 2).toLocaleDateString()];
    let d = 150
    let c = 100
    let b = 81
    for(let e in dates){
        if(dates[e] === new Date().toLocaleDateString()){
            dates[e] = "Aujourd'hui"
        }
    }
    return ( 
    <>
    <div className="col-md-5 col-xs-12 col-sm-12 card">
        <div className="card-header">
            Données par jours
        </div>
        <div className="card-body">
            <table id="table" className="table table-hover table-sm">
                <thead>
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Cas entrant</th>
                    <th scope="col">Cas soins intensifs</th>
                    <th scope="col">Décès</th>
                </tr>
                </thead>
                <tbody>
                    {dates.reverse().map((date)=>
                    <>
                    <tr key={date.toString()}>
                        <th scope="row">{date}</th>
                        <td>{d--}</td>
                        <td>{c--}</td>
                        <td>{b--}</td>
                    </tr>
                    </>
                    )}
                </tbody>
            </table>
        </div>
    </div>
    </>
     );
}
 
export default Table;