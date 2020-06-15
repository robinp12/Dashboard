import React, { Component } from "react";
import Chart from "chart.js";

class ChartCaseNumber extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const { suspect, averee } = this.props;
    let days = [];
    let vala = [];
    let valb = [];
    let concatDay;
    let labela;
    let nbra;

    let labelb;
    let nbrb;
    if (typeof (suspect || averee) != "undefined") {
      concatDay = new Date(suspect.date);

      labela = suspect.name_reference;
      nbra = suspect.value;
      labelb = averee.name_reference;
      nbrb = averee.value;
    } else {
      concatDay = new Date();
      labela = "Covid suspects";
      nbra = 10;
      labelb = "Covid avérés";
      nbrb = 3;
    }
    for (let i = 6; i >= 0; i--) {
      days[i] = concatDay.getDate() - i + "/" + (concatDay.getMonth() + 1);
      vala[i] = 25 + (-2 ^ i);
      valb[i] = 1 ^ ((i + nbrb / 1) * nbrb);
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
