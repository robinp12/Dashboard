import React, { Component } from 'react';
import Chart from 'chart.js';

class ChartCaseNumber extends Component {

    chartRef = React.createRef();

    componentDidMount() {
        const {date} = this.props
        const myChartRef = this.chartRef.current.getContext("2d");
        date.pop()
        for(let e in date){
            if(date[e] === new Date().toLocaleDateString()){
                date[e] = "Aujourd'hui"
            }
        }
        let d = new Date();
        let a = new Date();
        a.setDate(d.getDate()+1)
        date.unshift(a.toLocaleDateString())
        new Chart(myChartRef, {
            type: "line",
            data: {
                labels: date.reverse(),
                datasets: [{
                    label: 'Cas entrant',
                    data: [{
                        x: 1,
                        y: 1
                    }, {
                        x: 2,
                        y: 3
                    }, {
                        x: 3,
                        y: 9
                    }, {
                        x: 4,
                        y: 27
                    }, {
                        x: 5,
                        y: 81
                    }, {
                        x: 6,
                        y: 200
                    },],
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    weight: 20,
                    fill: false
                },{
                    label: 'Cas entrant estimé',
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    data: [null, null, null,null,null,
                    {
                        x: 6,
                        y: 200
                    }, {
                        x: 7,
                        y: 343
                    },],
                    fill: false,
                    borderDash: [5, 5],
                },{
                    label: 'Soins intensifs',
                    data: [{
                        x: 1,
                        y: 5
                    }, {
                        x: 2,
                        y: 5
                    }, {
                        x: 3,
                        y: 25
                    }, {
                        x: 4,
                        y: 50
                    }, {
                        x: 5,
                        y: 100
                    },{
                        x: 6,
                        y: 160
                    },],
                    backgroundColor: 'rgb(255, 205, 86)',
                    borderColor: 'rgb(255, 205, 86)',
                    weight: 20,
                    fill: false
                },{
                    label: 'Soins intensifs estimé',
                    backgroundColor: 'rgb(255, 205, 86)',
                    borderColor: 'rgb(255, 205, 86)',
                    data: [null, null, null,null,null,
                        {
                            x: 6,
                            y: 160
                        }, {
                            x: 7,
                            y: 260
                        },],
                    fill: false,
                    borderDash: [5, 5],
                },{
                    label: 'Décès',
                    data: [{
                        x: 1,
                        y: 1
                    }, {
                        x: 2,
                        y: 2
                    }, {
                        x: 3,
                        y: 8
                    }, {
                        x: 4,
                        y: 16
                    },{
                        x: 5,
                        y: 90
                    },{
                        x: 6,
                        y: 218
                    }],
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    weight: 20,
                    fill: false
                },{
                    label: 'Décès estimé',
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: [null, null, null,null,null,
                    {
                        x: 6,
                        y: 218
                    },{
                        x: 7,
                        y: 356
                    }],
                    fill: false,
                    borderDash: [5, 5],
                },]
            },
            options: {
                maintainAspectRatio:false,
                legend: {
                    labels:{
                        fontSize: 13,
                        boxWidth: 12
                    },
                    display: true,
                    position: 'bottom',
                    reverse: false
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 20,
                        bottom: 1
                    }
                }
            }
        });
    }
    render(){
        return(
            <>
            <div className="col-xs col-md card" >
                    <div className="card-header">
                        Cas COVID
                    </div>
                    <canvas id="myChart" className="secondrow" ref={this.chartRef}></canvas>
                </div>
            </>
        )
    }
}

export default ChartCaseNumber