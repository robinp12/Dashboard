import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Axios from 'axios';

class MapList extends Component {

    state = {
        hopitals : [],
        province : [],
        supprime : []
    }
    componentDidMount(){
        let prov = [];
        
        Axios.get("http://localhost:8000/api/hospitals")
        .then(response => response.data["hydra:member"])
        .then(data => {
            this.setState({hopitals : data})
            for(let e in data){
                if(!prov.includes(data[e].province)){
                        prov.push(data[e].province)
                }
            }
            this.setState({province : prov})
        })
        .catch(error => {
            console.log(error.response.data)
            toast(error + "",{
                className: 'bg-red',
            });
        });
    }
    handleClick = (tab, e) => {
        const {hopitals, province} = this.state;
        const {id, checked} = e.target;
        for(let e in hopitals){
            if(checked && hopitals[e].province == id){
                tab.pop(hopitals[e].id)
            }
            else if(!checked && hopitals[e].province == id){
                tab.push(hopitals[e].id)
            }
        }
        // this.setState({supprime: tab})
        console.log(tab)
    }
    list = (hopitals,tab) => {
        return hopitals.map((hopital,index) => 
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                {hopital.id +" "+hopital.name}
                <span className="badge badge-danger badge-pill">{Math.floor(Math.random() * 200)}</span>
            </li>)
    }
    render(){
        const {hopitals, province} = this.state;
        var tab = [];
        return ( 
        <>
            <div>
                {province.map((ville,index) => 
                <div key={index} className="form-check form-check-inline">
                    <input type="checkbox" onClick={(e) => this.handleClick(tab,e)} className="form-check-input" id={ville} defaultChecked/>
                    <label className="form-check-label" htmlFor={"Check"+ index} value={ville}>
                        {ville}
                    </label>
                </div>)}
            </div>
            <br/>
            <ul className='list-group text-muted list-group-flush'>
               {this.list(hopitals,tab)}
            </ul>
        </>);}
}
 
export default MapList;