import React from "react";
//Material UI
import { Grid, Typography } from "@mui/material";


export default class Chart extends React.Component {
  render() {
    //Destructuring Props
    const { test } = this.props;
    return (
      <div>{test}</div>
    );
  }
}
