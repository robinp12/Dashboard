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
                        'rgba(243, 201, 201, 1)',
                        'rgba(227, 195, 161, 1)',
                        'rgba(223, 219, 170, 1)',
                        'rgba(170, 197, 166, 1)',
                        'rgba(170, 203, 189, 1)',
                        'rgba(178, 208, 210, 1)',
                        'rgba(204, 208, 225, 1)',
                        'rgba(221, 211, 232, 1)',
                        'rgba(224, 204, 221, 1)',
                    ],
                    type: 'bar',
                    order: 2
                }
                ]
            },
            options: {
                maintainAspectRatio:false,
                tooltips: {
                    intersect:false,
                    backgroundColor: '#FFF',
                    borderWidth: 0.1,
                    borderColor: '#000',
                    titleFontSize: 14,
                    titleFontColor: '#777',
                    bodyFontColor: '#555',
                    bodyFontSize: 13,
                    mode: "index",
                },
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