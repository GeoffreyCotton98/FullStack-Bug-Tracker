import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
  withStyles,
} from "@mui/material/styles";
import { InputAdornment, MenuItem } from "@mui/material";
import { PriorityData, TypeData, StatusData } from "../FormData";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTicket, reset } from "../../features/tickets/ticketSlice";
import Spinner from "../Spinner";
import Title from "../Title";

const theme = createTheme();

function TicketForm({ onAdd, projects }) {
  const { ticket, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [dueDate, setDate] = useState("");
  const [status, setStatus] = useState("Open");
  const [priority, setPriority] = useState("low");
  const [type, setType] = useState("Front-End");
  const [projectID, setProjectID] = useState("");
  const [myProjects, setMyProjects] = useState([]);

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
  const handleProject = (event) => {
    setProjectID(event.target.value);
  };

  //redux

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //redirect after submit
    if (isSuccess) {
      dispatch(reset());
    }

    dispatch(reset());
  }, [isError, isSuccess, ticket, message, navigate, dispatch]);

  //sends ticket to database
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "" || dueDate === "") {
      toast.error("please fill out all fields");
      return;
    } else {
      onAdd({
        title,
        description,
        dueDate,
        status,
        priority,
        type,
        project: projectID,
      });
    }

    setTitle("");
    setDesc("");
    setDate("");
    setPriority("low");
    setType("Front-End");
    setStatus("Open");

    navigate("/Dashboard/MyTickets");
    toast("You created a new ticket");
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
                    <h2>Submit Ticket</h2>
                  </Paper>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
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
                      fullWidth
                      name="description"
                      label="Description"
                      id="description"
                      value={description}
                      onChange={handleDesc}
                      multiline
                      rows={8}
                    />
                  </Grid>

                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
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
                  <Grid item xs={12} md={6} lg={3}>
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

                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      id="ticketPriority"
                      margin="normal"
                      select
                      fullWidth
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
                  <Grid item xs={12} md={6} lg={3}>
                    <TextField
                      id="ticketPriority"
                      margin="normal"
                      select
                      fullWidth
                      value={type}
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
                    <TextField
                      id="ticketType"
                      margin="normal"
                      fullWidth
                      select
                      value={projectID}
                      onChange={handleProject}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Project:
                          </InputAdornment>
                        ),
                      }}
                    >
                      {projects.map((project) => (
                        <MenuItem key={project._id} value={project._id}>
                          {project.title}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Box>
            </Paper>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default TicketForm;
