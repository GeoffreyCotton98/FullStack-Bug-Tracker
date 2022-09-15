import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";

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

import { useState, useEffect } from "react";

import Title from "../../Title";

const theme = createTheme();

function TicketProject({ updateTicket, deleteTicket }) {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [author, setAuthor] = useState([]);
  const [status, setStatus] = useState("");
  const [assigned, setAssigned] = useState("");
  const [isDemo, setDemoDisabled] = useState(false);
  const [isDisabled, setDisabled] = useState(false);

  const handleAssigned = (event) => {
    setAssigned(event.target.value);
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
    const getDevelopers = async () => {
      const devsFromServer = await fetchProjectDevelopers();
      setDevelopers(devsFromServer);
    };

    const getAuthor = async () => {
      const authorFromServer = await fetchTicketAuthor();
      setAuthor(authorFromServer);
    };

    if (loggedInUser.lastName === "Demo") {
      setDemoDisabled(true);
    }

    getAuthor();
    getTicket();
    getDevelopers();
  }, []);
  const params = useParams();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = loggedInUser.token;

  const fetchProjectDevelopers = async () => {
    const res = await fetch(
      `/api/projects/projectDevelopersFromTicket/${params.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    return data;
  };

  const fetchTicketAuthor = async () => {
    const res = await fetch(`/api/tickets/ticketAuthor/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

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

    toast(`Ticket is assigned`);
  };

  const HandleDelete = (e) => {
    e.preventDefault();

    window.confirm("Delete Ticket?");

    deleteTicket(ticket._id);

    navigate(`/Dashboard/ProjectManage/Project/${ticket.project}`);

    toast("Ticket has been Deleted");
  };

  const fetchTicket = async () => {
    const res = await fetch(`/api/tickets/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
                      <p>Submitted: {ticket.createdAt}</p>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={6} lg={4}>
                    <div className="singleTicketDisplay">
                      <p>
                        Submitted by: {author.firstName} {author.lastName}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid item xs={12} md={6} lg={4}>
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
                      {developers.map((user) => (
                        <MenuItem key={user._id} value={user._id}>
                          {user.firstName} {user.lastName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12} md={6} lg={6}>
                    <Button
                      type="submit"
                      disabled={isDisabled}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Submit
                    </Button>
                  </Grid>
                  <Grid item xs={12} md={6} lg={2}>
                    <Button
                      color="error"
                      onClick={HandleDelete}
                      disabled={isDemo}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Delete Ticket
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default TicketProject;
