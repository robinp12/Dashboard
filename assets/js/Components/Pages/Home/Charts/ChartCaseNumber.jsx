import React, { Component } from "react";
import Chart from "chart.js";

class ChartCaseNumber extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const { suspect, averee, date } = this.props;
    let days = [];
    let vala = [];
    let valb = [];
    if (isNaN(suspect && averee)) {
      console.log(suspect[0], averee[0]);
      let concatDay = new Date(suspect[0].date);

      let labela = suspect[0].name_reference;
      let nbra = suspect[0].value;
      
      let labelb = averee[0].name_reference;
      let nbrb = averee[0].value;
      
      for (let i = 6; i >= 0; i--) {
        days[i] = concatDay.getDate() - i + "/" + (concatDay.getMonth() + 1);
        vala[i] = 15+(-2^i);
        valb[i] = averee[0].value;
      }
      const myChartRef = this.chartRef.current.getContext("2d");
      new Chart(myChartRef, {
        type: "line",
        data: {
          labels: days.reverse(),
          datasets: [
            {
              label: labelb,
              data: valb,
              backgroundColor: "rgba(165, 203, 227, 1)",
              borderColor: "rgba(165, 203, 227, 1)",
              weight: 20,
              fill: false,
            },
            {
              label: labela,
              data: vala,
              backgroundColor: "rgba(239, 159, 176, 1)",
              borderColor: "rgba(239, 159, 176, 1)",
              weight: 20,
              fill: false,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            enabled: true,
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
