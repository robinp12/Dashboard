import React, { Component } from 'react';
import Chart from 'chart.js';

class ChartUSNumber extends Component {

    chartRef = React.createRef();
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        new Chart(myChartRef, {
            type: 'bar',
            data: {
                labels: ['Infectieux', 'Geriatrie', 'Psy', 'Chirugicale', 'CNN', 'Onco', 'Med', 'Neuro', 'Suspect', ],
                datasets: [{
                    data: [12, 0, 10, 14, 25, 3, 11, 0, 13],
                    backgroundColor: [
                        'rgb(255,134,134)',
                        'rgb(235,174,109)',
                        'rgba(197,190,102,0.8)',
                        'rgba(87,164,73,0.54)',
                        'rgb(139,235,195)',
                        'rgba(28,183,191,0.59)',
                        'rgba(81,105,206,0.75)',
                        'rgb(190,151,235)',
                        'rgba(187,141,180,0.73)',
                    ],
                    type: 'bar',
                    order: 2
                }
                ]
            },
            options: {
                maintainAspectRatio:false,
                legend: {
                    display: false,
                    position: "right",
                    labels: {
                        boxWidth: 12
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 10,
                        bottom: 1
                    }
                }
            }
        });
    }
    render(){
        return(
            <>
                <div className="col-md col-xs card">
                    <div className="card-header">
                        Cas par unité de soin
                    </div>
                    <canvas id="myChart" className="secondrow" ref={this.chartRef}></canvas>
                </div>
            </>
        )
    }
}

export default ChartUSNumber