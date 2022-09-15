import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import PriorityIcon from "../../PriorityIcon";

import { Divider } from "@mui/material";
import { useParams } from "react-router-dom";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  withStyles,
} from "@mui/material/styles";
import { InputAdornment, MenuItem } from "@mui/material";
import { PriorityData, TypeData, StatusData } from "../../FormData";
import { useState, useEffect } from "react";
import CommentTable from "../../CommentTable";

const theme = createTheme();

function SingleTicketDisplay({ allUsers, updateTicket, deleteTicket }) {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState([]);
  const [author, setAuthor] = useState([]);
  const [status, setStatus] = useState("");
  const [assigned, setAssigned] = useState("");
  const [comment, setComment] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [isDemo, setDemoDisabled] = useState(false);

  const handleAssigned = (e) => {
    setAssigned(e.target.value);

    setStatus("In-Progress");
  };

  useEffect(() => {
    const getTicket = async () => {
      const ticketFromServer = await fetchTicket();
      setTicket(ticketFromServer);
      setAssigned(ticketFromServer.assigned);
      if (ticketFromServer.status === "Closed") {
        setDisabled(true);
      }
      if (assigned && ticketFromServer.status !== "Closed") {
        setStatus("In-Progress");
      } else {
        setStatus(ticketFromServer.status);
      }
    };

    if (loggedInUser.lastName === "Demo") {
      setDemoDisabled(true);
    }

    const getAuthor = async () => {
      const authorFromServer = await fetchTicketAuthor();
      setAuthor(authorFromServer);
    };

    getTicket();
    getAuthor();
  }, []);
  const params = useParams();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = loggedInUser.token;

  //sends edited ticket to database
  const handleSubmit = (e) => {
    e.preventDefault();

    updateTicket({
      _id: ticket._id,
      user: ticket.user,
      title: ticket.title,
      description: ticket.description,
      dueDate: ticket.dueDate,
      priority: ticket.priority,
      status,
      type: ticket.type,
      createdAt: ticket.createdAt,
      assigned,
    });

    navigate("/Dashboard/tickets");

    toast(`Ticket is assigned`);
  };

  const HandleDelete = (e) => {
    e.preventDefault();

    window.confirm("Delete Ticket?");

    deleteTicket(ticket._id);

    navigate("/Dashboard/tickets");

    toast("Ticket has been Deleted");
  };

  const HandleEdit = () => {
    if (window.confirm("Are you sure you want to edit this ticket") === true) {
      navigate(`/Dashboard/Tickets/EditTicket/${ticket._id}`);
    } else {
      return;
    }
  };

  const fetchTicket = async () => {
    const res = await fetch(`http://localhost:5000/api/tickets/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };
  const fetchTicketAuthor = async () => {
    const res = await fetch(
      `http://localhost:5000/api/tickets/ticketAuthor/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();

    return data;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={7}>
                <Paper
                  elevation={20}
                  sx={{
                    p: 2,
                  }}
                >
                  <Box component="form" onSubmit={handleSubmit} noValidate>
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
                        <h2>Ticket ID: {ticket._id}</h2>
                      </Paper>
                    </div>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <h2 className="singleTicketDisplay" id="ticketTitle">
                          {ticket.title}
                        </h2>
                      </Grid>
                      <Grid item xs={12}>
                        <div className="singleTicketDisplayDesc">
                          <h3>Description:</h3>

                          {ticket.description}
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>Due Date: {ticket.dueDate}</p>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>Status: {status}</p>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>Priority: {ticket.priority}</p>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>Type: {ticket.type}</p>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>
                            Submitted by: {author.firstName} {author.lastName}
                          </p>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>Submitted: {ticket.createdAt}</p>
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>

                      <Grid item xs={6} md={6} lg={4}>
                        <TextField
                          id="ticketAssigned"
                          margin="normal"
                          fullWidth
                          select
                          value={assigned}
                          onChange={handleAssigned}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                Assigned to:
                              </InputAdornment>
                            ),
                          }}
                        >
                          {allUsers.map((user) => (
                            <MenuItem
                              key={user._id}
                              value={user._id}
                              disabled={isDisabled}
                            >
                              {user.firstName} {user.lastName}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={6} md={6} lg={6}>
                        <Button
                          type="submit"
                          disabled={isDisabled}
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Submit
                        </Button>
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          disabled={isDemo}
                          onClick={HandleEdit}
                          variant="contained"
                          sx={{ mt: 3, mr: 2 }}
                        >
                          Edit Ticket
                        </Button>
                        <Button
                          color="error"
                          disabled={isDemo}
                          onClick={HandleDelete}
                          variant="contained"
                          sx={{ mt: 3, mr: 2 }}
                        >
                          Delete Ticket
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={5}>
                <Paper
                  elevation={20}
                  sx={{
                    p: 2,
                  }}
                >
                  <Grid container>
                    <Grid item xs={12}>
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
                          <h2>Comments</h2>
                        </Paper>
                      </div>
                    </Grid>
                    <Grid item xs={12}>
                      <CommentTable />
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default SingleTicketDisplay;
