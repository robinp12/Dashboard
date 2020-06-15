import Chart from "chart.js";
import React, { Component } from "react";

class ChartUSNumber extends Component {
  chartRef = React.createRef();

  componentDidMount() {
    const { suspect, averee } = this.props;
    let tab = [];
    let data = [];
    if (typeof (suspect || averee) != "undefined") {
      tab = ["Infectieux", "Geriatrie", "Psy", "Chirugicale", "Med", "Neuro"];
      data = [2, 0, 4, 5, 1, 0];
    } else {
      tab = [
        "Infectieux",
        "Psy",
        "Geriatrie",
        "Chirugicale",
        "CNN",
        "Onco",
        "Neuro",
        "Med",
      ];
      data = [9, 0, 10, 8, 15, 3, 5, 0];
    }
    const myChartRef = this.chartRef.current.getContext("2d");
    new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: tab,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "rgba(243, 201, 201, 1)",
              "rgba(227, 195, 161, 1)",
              "rgba(223, 219, 170, 1)",
              "rgba(170, 197, 166, 1)",
              "rgba(170, 203, 189, 1)",
              "rgba(178, 208, 210, 1)",
              "rgba(204, 208, 225, 1)",
              "rgba(221, 211, 232, 1)",
            ],
            type: "bar",
            order: 2,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        tooltips: {
          intersect: false,
          backgroundColor: "#FFF",
          borderWidth: 0.1,
          borderColor: "#000",
          titleFontSize: 14,
          titleFontColor: "#777",
          bodyFontColor: "#555",
          bodyFontSize: 13,
          mode: "index",
        },
        legend: {
          display: false,
          position: "right",
          labels: {
            boxWidth: 12,
          },
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 10,
            bottom: 1,
          },
        },
      },
    });
  }
  render() {
    return (
      <>
        <div className="col-md col-xs card">
          <div className="card-header">Cas par unité de soin</div>
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

export default ChartUSNumber;
