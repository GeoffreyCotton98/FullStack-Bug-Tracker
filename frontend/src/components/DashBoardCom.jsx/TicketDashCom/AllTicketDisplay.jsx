import * as React from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Title from "../../Title";
import PriorityIcon from "../../PriorityIcon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function preventDefault(event) {
  event.preventDefault();
}

export default function AllTicketDisplay({ tickets }) {
  const navigate = useNavigate();

  const [allTickets, setAllTickets] = useState(tickets);
  const [status, setStatusFilter] = useState("All");
  const [priority, setPriorityFilter] = useState("All");
  const [type, setTypeFilter] = useState("All");
  const [searched, setSearched] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (status === "All" && priority === "All" && type === "All") {
      setAllTickets(tickets);
    }
  }, [tickets]);

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterStatus = (e) => {
    setStatusFilter(e.target.value);
    setPriorityFilter("All");
    setTypeFilter("All");

    if (e.target.value === "All") {
      setAllTickets(tickets);
    }
    if (e.target.value === "Open") {
      const onlyOpen = tickets.filter((ticket) => ticket.status === "Open");
      setAllTickets(onlyOpen);
    }
    if (e.target.value === "In-Progress") {
      const onlyProgress = tickets.filter(
        (ticket) => ticket.status === "In-Progress"
      );
      setAllTickets(onlyProgress);
    }
    if (e.target.value === "Closed") {
      const onlyClosed = tickets.filter((ticket) => ticket.status === "Closed");
      setAllTickets(onlyClosed);
    }
  };

  //////Priority Filter
  const handleFilterPriority = (e) => {
    setStatusFilter("All");
    setTypeFilter("All");
    setPriorityFilter(e.target.value);

    if (e.target.value === "All") {
      setAllTickets(tickets);
    }
    if (e.target.value === "low") {
      const onlyLow = tickets.filter((ticket) => ticket.priority === "low");
      setAllTickets(onlyLow);
    }
    if (e.target.value === "medium") {
      const onlyMedium = tickets.filter(
        (ticket) => ticket.priority === "medium"
      );
      setAllTickets(onlyMedium);
    }
    if (e.target.value === "high") {
      const onlyHigh = tickets.filter((ticket) => ticket.priority === "high");
      setAllTickets(onlyHigh);
    }
    if (e.target.value === "urgent") {
      const onlyUrgent = tickets.filter(
        (ticket) => ticket.priority === "urgent"
      );
      setAllTickets(onlyUrgent);
    }
  };

  ///type filter

  const handleFilterType = (e) => {
    setPriorityFilter("All");
    setStatusFilter("All");
    setTypeFilter(e.target.value);

    if (e.target.value === "All") {
      setAllTickets(tickets);
    }
    if (e.target.value === "Front-End") {
      const onlyFront = tickets.filter((ticket) => ticket.type === "Front-End");
      setAllTickets(onlyFront);
    }
    if (e.target.value === "Back-End") {
      const onlyback = tickets.filter((ticket) => ticket.type === "Back-End");
      setAllTickets(onlyback);
    }
    if (e.target.value === "Feature") {
      const onlyFeature = tickets.filter((ticket) => ticket.type === "Feature");
      setAllTickets(onlyFeature);
    }
    if (e.target.value === "Other") {
      const onlyOther = tickets.filter((ticket) => ticket.type === "Other");
      setAllTickets(onlyOther);
    }
  };

  ////search functionality

  const requestSearch = (e) => {
    setPriorityFilter("All");
    setStatusFilter("All");
    setTypeFilter("All");
    setSearched(e.target.value);

    if (e.target.value === "") {
      setAllTickets(tickets);
    }

    const filteredTickets = tickets.filter((ticket) => {
      return ticket.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setAllTickets(filteredTickets);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            elevation={20}
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          >
            <div className="allProjectsTableHeader">
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage:
                    "linear-gradient(to top right, #FAC213 , #F77E21)",
                  color: "white",
                }}
              >
                <h2>All Tickets</h2>
              </Paper>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  fullWidth
                  value={searched}
                  onChange={requestSearch}
                  id="outlined-basic"
                  label="Search Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Filter Priority
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={priority}
                    label="Filter Status"
                    onChange={handleFilterPriority}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"low"}>Low</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"high"}>High</MenuItem>
                    <MenuItem value={"urgent"}>Urgent</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Filter Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Filter Status"
                    onChange={handleFilterStatus}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Open"}>Open</MenuItem>
                    <MenuItem value={"In-Progress"}>In-Progress</MenuItem>
                    <MenuItem value={"Closed"}>Closed</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Filter Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={type}
                    label="Filter Status"
                    onChange={handleFilterType}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Front-End"}>Front-End</MenuItem>
                    <MenuItem value={"Back-End"}>Back-end</MenuItem>
                    <MenuItem value={"Feature"}>Feature Request</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableTitle">
                      <strong>Title</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Due Date</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Priority</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Type</strong>
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? allTickets.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : allTickets
                  ).map((ticket) => (
                    <TableRow className="tableEl" key={ticket._id}>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.dueDate}</TableCell>
                      <TableCell>
                        <PriorityIcon ticket={ticket} />
                      </TableCell>
                      <TableCell>{ticket.status}</TableCell>
                      <TableCell>{ticket.type}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => navigate(`Ticket/${ticket._id}`)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[0]}
                component="div"
                count={allTickets.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
