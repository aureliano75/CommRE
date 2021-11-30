import React, { useState } from "react";
//Material UI
import { Button, Grid, Container, Box, Typography } from "@mui/material";

import Chart from "../Chart/Chart";
import Table from "../Table/Table";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agent: "null",
    };
  }
  updateAgent = (currentAgent) => {
    this.setState({ agent: currentAgent });
  }
  render() {
    //Destructuring Props
    //const { test } = this.props;
    return (
      <Container>
        <Typography variant="h4">Data Analysis for CommRE</Typography>
        <Container>Sales by agent: {this.state.agent}</Container>
        <Grid container spacing={2}>
          <Grid item>
            <Table
              test={"Table Here"}
              updateAgent={this.updateAgent}
              state={this.state}
            ></Table>
          </Grid>
          <Grid item>
            <Chart test={"Chart Here"}></Chart>
          </Grid>
        </Grid>
      </Container>
    );
  }
}
