import React from 'react';

const Table = ({date}) => {
    let d = 20
    let c = 16
    let b = 21
    for(let e in date){
        if(date[e] === (new Date().getDate()+"/"+new Date().getMonth())){
            date[e] = "Aujourd'hui"
        }
    }
    return ( 
    <>
    <div className="col-md-5 col-xs-12 col-sm-12 card">
        <div className="card-header">
            Statistiques recentes
        </div>
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
                    {date.slice(0, 1).map((date, index)=>
                    <tr key={index}>
                        <th key={index} scope="row">{date}</th>
                        <td>{d++}</td>
                        <td>{c++}</td>
                        <td>{b++}</td>
                    </tr>
                    )}
                    <tr>
                        <th scope="row">{date[1]}</th>
                        <td>{d+2}</td>
                        <td>{c+3}</td>
                        <td>{b+4}</td>
                    </tr>
                    <tr>
                        <th scope="row">{date[2]}</th>
                        <td>{d+3}</td>
                        <td>{c+4}</td>
                        <td>{b+5}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    </div>
    </>
     );
}
 
export default Table;