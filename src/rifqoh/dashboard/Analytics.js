import React, { Component } from "react";

import { Line } from "react-chartjs-2";
import Token from "../utils/utils";
import axios from "axios";
import url from "../config/url";

class Analytics extends Component {
  state = {
    loading: true,
    empty: false,
    error: false,
    day: [],
    data_set: []
  };
  componentDidMount() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${Token()}`
    };
    axios
      .get(`${url}/api/get_shop_view/`, { headers: headers })
      .then(res => {
        let { day_set } = res.data;
        let { data_set } = res.data;
        this.setState({ day_set });
        this.setState({ data_set });
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }
  render() {
    const { day_set, data_set, loading } = this.state;
    const data = {
      labels: day_set,
      datasets: [
        {
          label: "Page Views",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data_set
        }
      ]
    };

    let options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    };
    return (
      <div className="analytics-container">
        <h5 className="mb-1 mt-3">
          <b>Recently Clicked</b>
        </h5>
        <div className="p-3 bg-white text-center rounded canvas-container">
          {loading ? (
            <p>Loading please wait.</p>
          ) : data_set.length > 0 ? (
            <Line data={data} options={options} />
          ) : (
            <p className="text-center">You have no data yet</p>
          )}
        </div>
      </div>
    );
  }
}
export default Analytics;
