import React from "react";
//Material UI
import { Grid, Container, Box, Typography } from "@mui/material";
//Components
import Chart from "../Chart/Chart";
import Table from "../Table/Table";
import Footer from "../Footer/Footer";
//css
import "./Dashboard.css";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      agent: "",
      agents: {},
    };
  }
  componentWillMount() {}
  componentDidMount() {
    this.promisedFetch();
  }
  promisedFetch() {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(console.log("fetching..."));
      }, 300);
    });
    myPromise.then(() => {
      this.fetchSales()
        .then((res) =>
          this.setState({
            agents: res.agents,
            agent: Object.keys(res.agents)[0],
          })
        )
        .catch((err) => console.log(err));
    });
  }
  // fetching the GET route from the Express server which matches the GET route from server.js
  fetchSales = async () => {
    const response = await fetch("/sales");
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log("fetching complete");
    return body;
  };

  updateAgent = (currentAgent) => {
    this.setState({ agent: currentAgent });
  };

  render() {
    return (
      <Container className="dashWrapper">
        <Typography variant="h4">Data Analysis for CommRE</Typography>
        <Box
          style={{ backgroundColor: "black", color: "white", padding: "5px" }}
        >
          <Typography align="left" variant="h6">
            Sales by agent: {this.state.agent}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Table updateAgent={this.updateAgent} state={this.state}></Table>
          </Grid>
          <Grid item xs={12} md={6}>
            <Chart state={this.state}></Chart>
          </Grid>
        </Grid>
        <Footer />
      </Container>
    );
  }
}
