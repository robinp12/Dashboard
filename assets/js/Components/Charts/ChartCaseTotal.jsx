import React, { Component } from 'react';
import Chart from 'chart.js';

class ChartCaseNumber extends Component {

    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: 'pie',
            data: {
                labels: ['Décès', 'Cas entrant', 'Soins intensifs'],
                datasets: [{
                    label: '#',
                    data: [12, 10, 5],
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                    ],
                }]
            },
            options: {
                maintainAspectRatio:false,
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        fontSize: 13,
                        boxWidth: 12
                    },
                    reverse: true
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 5,
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