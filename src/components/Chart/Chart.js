import React from "react";
//Material UI
import { Grid, Typography } from "@mui/material";

import Chart from "react-google-charts";
export default class googleChart extends React.Component {
  constructor(props) {
    super(props);
  }
  parseDataforChart() {
    const rows = [];
    for (const [key, value] of Object.entries(
      this.props.state.agents[this.props.state.agent]
    )) {
      if (key == "total") {
        rows.push(["Property Type", "Property Sales"]);
      } else {
        rows.push([key, value]);
      }
    }
    return rows;
  }
  render() {
    return (
      <div>
        {this.props.state.agents[this.props.state.agent] && (
          <Chart
            style={{ width: "100%" }}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={this.parseDataforChart()}
          />
        )}
      </div>
    );
  }
}
