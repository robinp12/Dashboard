import React, { Component } from 'react';
import Chart from 'chart.js';
import { isIterable } from 'core-js';

class ChartCaseNumber extends Component {

    constructor(props){
        super(props);
    }
    chartRef = React.createRef();
    
    componentDidMount() {
        const name = [];
        const val = [2,4];
        const id = [];
        const datee = [];
        const {props} = this.props;
           const [f,s,t] = props;
           if(f){
               const {name_reference, value, id_service, date} = f;
               console.log(name_reference, value, id_service, date)
               name.push(value + " " + name_reference);
               val.push(value);
               id.push(id_service);
               datee.push(date);
           }

        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: 'pie',
            data: {
                labels: [name, '347 Cas entrant', '302 Soins intensifs'],
                datasets: [{
                    label: '#',
                    data: val,
                    backgroundColor: [
                        'rgba(239, 159, 176, 1)',
                        'rgba(165, 203, 227, 1)',
                        'rgba(247, 223, 161, 1)',
                    ],
                }]
            },
            options: {
                maintainAspectRatio:false,
                tooltips: {
                    intersect:false,
                    backgroundColor: '#FFF',
                    borderWidth: 0.1,
                    borderColor: '#000',
                    titleFontSize: 13,
                    titleFontColor: '#0066ff',
                    bodyFontColor: '#555',
                    bodyFontSize: 14,
                    mode: "dataset",
                },
                
                legend: {
                    display: true,
                    position: "left",
                    labels: {
                        fontSize: 13,
                        boxWidth: 12,
                    },
                    reverse: true,
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 2,
                        top: 2,
                        bottom: 1
                    }
                }
            }
        });
    }
    render(){
        return(
            <>
            <div className="col-md col-xs col-sm card">
                <div className="card-header">
                    Cas totaux
                </div>  
                     <canvas id="myChart" className="firstrow" ref={this.chartRef}></canvas>
            </div>
            </>
        )
    }
}

export default ChartCaseNumber