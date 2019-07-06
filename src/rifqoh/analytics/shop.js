import React, { Component } from "react";

import { Line } from "react-chartjs-2";
import Nav from "../navTypes/commerceNav";
import axios from "axios";
import url from "../config/url";

export default class shopAnalytics extends Component {
  state = {
    data: "",
    day: "",
    dataField: ""
  };
  componentDidMount() {
    const { slug } = this.props.match.params;
    axios.get(`${url}/api/get_shop_view/${slug}/`).then(res => {
      const { data: day } = JSON.parse(res.data.day_set);
      const { data: data_set } = JSON.parse(res.data.data_set);
      const data = {
        labels: day,
        datasets: [
          {
            label: "Shop visits",
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
        ],
        height: 200
      };
      this.setState({ data });
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <Nav />
        <div className="p-3 bg-white m-2">
          
            <Line data={data} />
        </div>
      </div>
    );
  }
}
