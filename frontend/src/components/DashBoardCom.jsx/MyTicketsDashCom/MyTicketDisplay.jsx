import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { FormControlLabel, Switch } from "@mui/material";
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
import { useSelector, useDispatch } from "react-redux";
import { createTicket, reset } from "../../../features/tickets/ticketSlice";
import { useParams } from "react-router-dom";

import Title from "../../Title";

const theme = createTheme();

function MyTicketDisplay({ updateTicket }) {
  const navigate = useNavigate();

  const [ticket, setTicket] = useState([]);
  const [isDisabled, setDisabled] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [dueDate, setDate] = useState("");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("low");
  const [type, setType] = useState("Front-End");

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDesc = (event) => {
    setDesc(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handlePriority = (event) => {
    setPriority(event.target.value);
  };
  const handleType = (event) => {
    setType(event.target.value);
  };
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  //redux

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
    };

    getTicket();
  }, []);
  //sends edited ticket to database
  const handleSubmit = (e) => {
    e.preventDefault();

    updateTicket({
      _id: ticket._id,
      user: ticket.user,
      title,
      description,
      dueDate,
      priority,
      status,
      type,
      createdAt: ticket.createdAt,
      assigned: ticket.assigned,
    });

    navigate("/Dashboard/MyTickets");

    toast(`Your Ticket is updated`);
  };

  const onEdit = () => {
    setDisabled(!isDisabled);
  };

  const params = useParams();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = loggedInUser.token;

  const fetchTicket = async () => {
    const res = await fetch(`http://localhost:5000/api/tickets/${params.id}`, {
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
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ m: 1 }}
              >
                <Title>Ticket ID: {ticket._id}</Title>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      disabled={isDisabled}
                      fullWidth
                      id="title"
                      label="Subject"
                      name="subject"
                      value={title}
                      autoFocus
                      onChange={handleTitle}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      disabled={isDisabled}
                      fullWidth
                      name="description"
                      label="Description"
                      id="description"
                      value={description}
                      onChange={handleDesc}
                      multiline
                      rows={6}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      disabled={isDisabled}
                      name="date"
                      id="date"
                      type="date"
                      value={dueDate}
                      onChange={handleDate}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Due Date:
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField
                      id="outlined-start-adornment"
                      margin="normal"
                      select
                      fullWidth
                      disabled
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Status:
                          </InputAdornment>
                        ),
                      }}
                      value={status}
                      onChange={handleStatus}
                    >
                      {StatusData.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={4} lg={4}>
                    <TextField
                      id="ticketPriority"
                      margin="normal"
                      select
                      fullWidth
                      disabled={isDisabled}
                      value={priority}
                      onChange={handlePriority}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Priority:
                          </InputAdornment>
                        ),
                      }}
                    >
                      {PriorityData.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="ticketType"
                      margin="normal"
                      fullWidth
                      select
                      value={type}
                      disabled={isDisabled}
                      onChange={handleType}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Type:
                          </InputAdornment>
                        ),
                      }}
                    >
                      {TypeData.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      disabled={!isDisabled}
                      onClick={onEdit}
                      sx={{ mt: 3, mb: 2, mr: 3 }}
                    >
                      Edit Ticket
                    </Button>
                    <Button
                      type="submit"
                      disabled={isDisabled}
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Re-Submit
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

export default MyTicketDisplay;
