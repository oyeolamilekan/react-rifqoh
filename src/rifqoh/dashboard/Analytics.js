import React, { useEffect, useState } from "react";

import { Line } from "react-chartjs-2";
import Token from "../utils/utils";
import axios from "axios";
import url from "../config/url";

export default function Analytics() {
  const [state, setstate] = useState([]);

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${Token()}`
  };
  const slug = localStorage.getItem("shopSlug", "route4");
  useEffect(() => {
    axios
      .get(`${url}/api/get_shop_view/${slug}/`, { headers: headers })
      .then(res => {
        const { data: day } = JSON.parse(res.data.day_set);
        const { data: data_set } = JSON.parse(res.data.data_set);
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
        setstate({ data });
      });
  }, []);
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
  const { data } = state;
  return (
    <div className="analytics-component">
      <h5 className="mb-1 mt-3">
        <b>Dashboard</b>
      </h5>
      <div className="p-3 bg-white text-center rounded canvas-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
