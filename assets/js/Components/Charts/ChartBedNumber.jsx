import React, { Component } from 'react';
import Chart from 'chart.js';

class ChartCaseNumber extends Component {

    chartRef = React.createRef();

    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: 'doughnut',
            data: {
                labels: ['352 Occupé', '347 Disponible', '302 Réserve'],
                datasets: [{
                    label: '# of Votes',
                    data: [352, 347, 302],
                    backgroundColor: [
                        'rgba(240, 188, 142, 1)',
                        'rgba(142, 176, 199, 1)',
                        'rgba(184, 197, 213, 1)',
                    ],
                }]
            },
            options: {
                maintainAspectRatio:false,
                tooltips: {
                    enabled: false,
                    // intersect:false,
                    // backgroundColor: '#FFF',
                    // borderWidth: 0.1,
                    // borderColor: '#000',
                    // titleFontSize: 13,
                    // titleFontColor: '#0066ff',
                    // bodyFontColor: '#555',
                    // bodyFontSize: 14,
                    // mode: "dataset",
                },
                legend: {
                    display: true,
                    position: "right",
                    labels: {
                        fontSize: 13,
                        boxWidth: 12,
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