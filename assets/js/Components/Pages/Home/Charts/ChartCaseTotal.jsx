import Chart from "chart.js";
import React, { Component } from "react";

class ChartCaseNumber extends Component {
  constructor(props) {
    super(props);
  }
  chartRef = React.createRef();

  componentDidMount() {
    const { suspect, averee } = this.props;
    if (isNaN(suspect && averee)) {
      const valuea = suspect?.value??17;
      const refa = suspect?.name_reference ?? "Covid suspects";
      const labela = (valuea ?? 0) + " " + refa;
      const vala = +valuea;

      const valueb = averee?.value??25;
      const refb = averee?.name_reference ?? "Covid avérés";
      const labelb = (valueb ?? 0) + " " + refb;
      const valb = +valueb;

      const myChartRef = this.chartRef.current.getContext("2d");
      new Chart(myChartRef, {
        type: "pie",
        data: {
          labels: [labela ?? "Non défini", labelb ?? "Non défini"],
          datasets: [
            {
              label: "#",
              data: [vala ?? 0, valb ?? 0],
              backgroundColor: [
                "rgba(239, 159, 176, 1)",
                "rgba(165, 203, 227, 1)",
              ],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
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
            position: "left",
            labels: {
              fontSize: 13,
              boxWidth: 12,
            },
            reverse: true,
          },
          layout: {
            padding: {
              left: 0,
              right: 2,
              top: 2,
              bottom: 1,
            },
          },
        },
      });
    }
  }
  render() {
    return (
      <>
        <div className="col-md col-xs col-sm card">
          <div className="card-header">Cas totaux</div>
          <canvas
            id="myChart"
            className="firstrow"
            ref={this.chartRef}
          ></canvas>
        </div>
      </>
    );
  }
}

export default ChartCaseNumber;
