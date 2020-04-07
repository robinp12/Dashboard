import React, { Component } from 'react';
import Chart from 'chart.js';

class ChartCaseNumber extends Component {

    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: 'doughnut',
            data: {
                labels: ['Occupé', 'Disponible', 'Réserve'],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3],
                    backgroundColor: [
                        'rgb(255,26,41)',
                        'rgb(82,93,235)',
                        'rgba(57,188,75,0.76)',
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
                    }
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
                    Inventaire des lits
                </div>
                     <canvas id="myChart" className="firstrow" ref={this.chartRef}></canvas>
            </div>
            </>
        )
    }
}

export default ChartCaseNumber