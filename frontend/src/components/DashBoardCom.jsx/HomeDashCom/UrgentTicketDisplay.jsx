import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(title, dueDate, type, description) {
  return {
    title,
    dueDate,
    type,
    description,
  };
}

function Row(props) {
  const { ticket } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {ticket.title}
        </TableCell>
        <TableCell align="right">{ticket.dueDate}</TableCell>
        <TableCell align="right">{ticket.type}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Description
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow></TableRow>
                </TableHead>
                <TableBody>{ticket.description}</TableBody>
                <TableBody>
                  <Typography variant="h6" gutterBottom component="div">
                    Author: Self
                  </Typography>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ tickets }) {
  const urgentTickets = tickets.filter(
    (ticket) => ticket.priority === "urgent"
  );
  if (!urgentTickets || urgentTickets.length === 0) {
    return (
      <>
        <h3>No Urgent Tickets</h3>
      </>
    );
  }
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>
              <strong>Title</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Due date</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Type</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urgentTickets.map((ticket) => (
            <Row key={ticket.title} ticket={ticket} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
