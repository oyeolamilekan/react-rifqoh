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
    const slug = localStorage.getItem("shopSlug", "");
    axios
      .get(`${url}/api/get_shop_view/${slug}/`, { headers: headers })
      .then(res => {
        const { data: day } = JSON.parse(res.data.day_set);
        const { data: data_set } = JSON.parse(res.data.data_set);
        this.setState({ day });
        this.setState({ data_set });
        this.setState({ loading: false });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }
  render() {
    const { day, data_set, loading } = this.state;
    const data = {
      labels: day,
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
      <div className="p-3 bg-white text-center rounded canvas-container">
        {loading ? (
          <p>Loading</p>
        ) : data.length > 0 ? (
          <Line data={data} options={options} />
        ) : (
          <p>Empty data</p>
        )}
      </div>
    );
  }
}
export default Analytics;
