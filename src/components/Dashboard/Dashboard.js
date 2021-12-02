import React, { useState } from "react";
//Material UI
import { Button, Grid, Container, Box, Typography } from "@mui/material";
//Needed for parsing a CSV files to a array
import Papa from "papaparse";
//Components
import Chart from "../Chart/Chart";
import Table from "../Table/Table";
//CSV provided
import salesdata from "../../data/Sale-Data.csv";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agent: "null",
      csv: {},
      parsedData: {},
    };
    this.getData = this.getData.bind(this);
    //const salesdata = 'http://localhost:8080'
  }
  componentWillMount() {
    this.getCsvData();
  }
  componentDidMount() {}
  componentDidUpdate() {}

  /*Parse CSV into Readable JSON
    const result = {
      steve: {
        total: 16,
        Office: 5,
        Land: 5,
        Residential: 6,
      },
      bob: {
        total: 4,
        Land: 2,
        Residential: 1,
        Office: 1,
      },
      jack: {
        total: 5,
        Office: 3,
        Land: 1,
        Residential: 1,
      },
    };
  */
  parseCsv(csvData) {
    const data = {};
    csvData.map((element) => {
      if (element[0] != "agent") {
        if (data[element[0]] == null) {
          data[element[0]] = {};
          data[element[0]]["total"] = 0;
        }
        if (data[element[0]] != null && data[element[0]][element[1]] == null) {
          console.log(data[element[0]]);
          data[element[0]][element[1]] = 0;
        }
        if (data[element[0]] != null && data[element[0]][element[1]] != null) {
          data[element[0]][element[1]] += 1;
          data[element[0]]["total"] += 1;
        }
      }
    });
    return data;
  }
  async getCsvData() {
    let csvData = await this.fetchCsv();
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(console.log("fetching..."));
      }, 300);
    });
    myPromise
      .then(() => {
        Papa.parse(csvData, {
          complete: this.getData,
        });
      })
      .then();
  }
  fetchCsv() {
    return fetch(salesdata)
      .then((response) => {
        let reader = response.body.getReader();
        let decoder = new TextDecoder("utf-8");
        return reader.read().then(function (result) {
          return decoder.decode(result.value);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  getData(result) {
    this.setState({ csv: result.data });
    console.log("fetch complete");
    this.setState({ parsedData: this.parseCsv(result.data) });
  }
  updateAgent = (currentAgent) => {
    this.setState({ agent: currentAgent });
  };

  render() {
    return (
      <Container>
        <Typography variant="h4">Data Analysis for CommRE</Typography>
        <Container style={{ backgroundColor: "black", color: "white" }}>
          Sales by agent: {this.state.agent}
        </Container>
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
