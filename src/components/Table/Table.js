import React, { useState } from "react"
//Material UI
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material"

export default class DataTable extends React.Component {
  constructor(props) {
    super(props)
  }
  //Render all rows from salesData
  rowsRender() {
    const rows = []
    for (const [key, value] of Object.entries(this.props.state.agents)) {
      rows.push(this.rowRender(key, value.total))
    }
    return rows
  }
  //Single row render
  rowRender(key, value) {
    return (
      <TableRow key={key}>
        <TableCell align="left" onClick={() => this.props.updateAgent(key)}>
          {key}
        </TableCell>
        <TableCell align="left">{value}</TableCell>
      </TableRow>
    )
  }
  render() {
    return (
      <div>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Agent</TableCell>
              <TableCell align="left">Sales</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.rowsRender()}</TableBody>
        </Table>
      </div>
    )
  }
}
