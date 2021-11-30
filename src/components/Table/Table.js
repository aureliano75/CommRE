import React, { useState } from "react";
//Material UI
import { Button, Grid, Typography } from "@mui/material";

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
  }
  render() {
    //Destructuring Props

    console.log("pr", this.props);
    return (
      <div>
        <Button onClick={() => this.props.updateAgent("testinnng")}>
          Click
        </Button>
        {this.props.test}
      </div>
    );
  }
}
