import React, { Component } from "react";
import Chart from "chart.js";

class ChartCaseNumber extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const { suspect, averee, date } = this.props;
    if (isNaN(suspect && averee)) {
        console.log(suspect, averee)
      const myChartRef = this.chartRef.current.getContext("2d");
      date.pop();
      for (let e in date) {
        if (
          date[e] ===
          new Date().getDate() + "/" + (new Date().getMonth() + 1)
        ) {
          date[e] = "Aujourd'hui";
        }
      }
      let d = new Date();
      let a = new Date();
      a.setDate(d.getDate() + 1);
      date.unshift(a.getDate() + "/" + (a.getMonth() + 1));
      new Chart(myChartRef, {
        type: "line",
        data: {
          labels: date.reverse(),
          datasets: [
            {
              label: "200 Cas entrant",
              data: [
                {
                  x: 1,
                  y: 1,
                },
                {
                  x: 2,
                  y: 3,
                },
                {
                  x: 3,
                  y: 9,
                },
                {
                  x: 4,
                  y: 27,
                },
                {
                  x: 5,
                  y: 81,
                },
                {
                  x: 6,
                  y: 200,
                },
              ],
              backgroundColor: "rgba(165, 203, 227, 1)",
              borderColor: "rgba(165, 203, 227, 1)",
              weight: 20,
              fill: false,
            },
            {
              label: "",
              backgroundColor: "rgba(165, 203, 227, 1)",
              borderColor: "rgba(165, 203, 227, 1)",
              data: [
                null,
                null,
                null,
                null,
                null,
                {
                  x: 6,
                  y: 200,
                },
                {
                  x: 7,
                  y: 343,
                },
              ],
              fill: false,
              borderDash: [5, 5],
            },
            {
              label: "160 Soins intensifs",
              data: [
                {
                  x: 1,
                  y: 5,
                },
                {
                  x: 2,
                  y: 5,
                },
                {
                  x: 3,
                  y: 25,
                },
                {
                  x: 4,
                  y: 50,
                },
                {
                  x: 5,
                  y: 100,
                },
                {
                  x: 6,
                  y: 160,
                },
              ],
              backgroundColor: "rgba(247, 223, 161, 1)",
              borderColor: "rgba(247, 223, 161, 1)",
              weight: 20,
              fill: false,
            },
            {
              label: "",
              backgroundColor: "rgba(247, 223, 161, 1)",
              borderColor: "rgba(247, 223, 161, 1)",
              data: [
                null,
                null,
                null,
                null,
                null,
                {
                  x: 6,
                  y: 160,
                },
                {
                  x: 7,
                  y: 260,
                },
              ],
              fill: false,
              borderDash: [5, 5],
            },
            {
              label: "218 Décès",
              data: [
                {
                  x: 1,
                  y: 1,
                },
                {
                  x: 2,
                  y: 2,
                },
                {
                  x: 3,
                  y: 8,
                },
                {
                  x: 4,
                  y: 16,
                },
                {
                  x: 5,
                  y: 90,
                },
                {
                  x: 6,
                  y: 218,
                },
              ],
              backgroundColor: "rgba(239, 159, 176, 1)",
              borderColor: "rgba(239, 159, 176, 1)",
              weight: 20,
              fill: false,
            },
            {
              label: "",
              backgroundColor: "rgba(239, 159, 176, 1)",
              borderColor: "rgba(239, 159, 176, 1)",
              data: [
                null,
                null,
                null,
                null,
                null,
                {
                  x: 6,
                  y: 218,
                },
                {
                  x: 7,
                  y: 356,
                },
              ],
              fill: false,
              borderDash: [5, 5],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            enabled: false,
            // filter: function (legendItem, chartData) {
            //     return (chartData.datasets[legendItem.datasetIndex].label)
            // },
            // intersect:false,
            // backgroundColor: '#FFF',
            // borderWidth: 0.1,
            // borderColor: '#000',
            // titleFontSize: 13,
            // titleFontColor: '#555',
            // bodyFontColor: '#555',
            // bodyFontSize: 12,
            // mode: "index"
          },
          legend: {
            labels: {
              fontSize: 13,
              boxWidth: 12,
              filter: function (legendItem, chartData) {
                return chartData.datasets[legendItem.datasetIndex].label;
              },
            },
            position: "bottom",
            reverse: false,
          },
          layout: {
            padding: {
              left: 0,
              right: 10,
              top: 20,
              bottom: 1,
            },
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  stepSize: 100,
                },
                position: "right",
              },
            ],
          },
        },
      });
    }
  }
  render() {
    return (
      <>
        <div className="col-xs col-md card">
          <div className="card-header">Evolution des cas COVID</div>
          <canvas
            id="myChart"
            className="secondrow"
            ref={this.chartRef}
          ></canvas>
        </div>
      </>
    );
  }
}

export default ChartCaseNumber;
