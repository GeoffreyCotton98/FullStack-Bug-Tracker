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
import CommentTable from "../../CommentTable";

const theme = createTheme();

function AssignedTicketDisplay({ updateTicket }) {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState([]);
  const [ticketAuthor, setAuthor] = useState([]);
  const [isDisabled, setDisabled] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [dueDate, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const getTicket = async () => {
      const ticketFromServer = await fetchTicket();
      setTicket(ticketFromServer);
      setTitle(ticketFromServer.title);
      setDesc(ticketFromServer.description);
      setDate(ticketFromServer.dueDate);
      setPriority(ticketFromServer.priority);
      setStatus(ticketFromServer.status);
      setType(ticketFromServer.type);

      if (ticketFromServer.status === "Closed") {
        setDisabled(true);
      }
    };

    const getAuthor = async () => {
      const authorFromServer = await fetchAuthor();
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
      status: "Closed",
      type: ticket.type,
      createdAt: ticket.createdAt,
      assigned: ticket.assigned,
    });

    navigate("/Dashboard/MyTickets");

    toast(`Ticket is Closed`);
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

  const fetchAuthor = async () => {
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
              marginTop: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} md={7} lg={7}>
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
                        <h2>ID: {ticket._id}</h2>
                      </Paper>
                    </div>

                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <h2 className="singleTicketDisplay" id="ticketTitle">
                          {title}
                        </h2>
                      </Grid>
                      <Grid item xs={12}>
                        <div className="singleTicketDisplayDesc">
                          <h3>Description:</h3>

                          {description}
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>Due Date: {dueDate}</p>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>Status: {status}</p>
                        </div>
                      </Grid>

                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>Priority: {priority}</p>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>Type: {type}</p>
                        </div>
                      </Grid>
                      <Grid item xs={12} md={6} lg={4}>
                        <div className="singleTicketDisplay">
                          <p>
                            Submitted by: {ticketAuthor.firstName}{" "}
                            {ticketAuthor.lastName}
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

                      <Grid item xs={12} md={6} lg={4}>
                        <Button
                          type="submit"
                          disabled={isDisabled}
                          variant="contained"
                          sx={{ mt: 3, mb: 2, mr: 3 }}
                        >
                          Close Ticket
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
              <Grid item xs={12} md={5} lg={5}>
                <Paper
                  elevation={20}
                  sx={{
                    p: 2,
                  }}
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
                      <h2>Comments</h2>
                    </Paper>
                  </div>
                  <CommentTable />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default AssignedTicketDisplay;
