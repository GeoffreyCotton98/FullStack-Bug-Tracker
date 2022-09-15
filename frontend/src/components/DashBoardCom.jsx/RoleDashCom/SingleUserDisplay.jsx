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

import { RoleData } from "../../FormData";
import { useState, useEffect } from "react";
import Title from "../../Title";
import CreatedTickets from "./CreatedTickets";
import AssignedTickets from "./AssignedTickets";
import UserProjectsTable from "./UserProjectsTable";

const theme = createTheme();

function SingleUserDisplay({ updateUser }) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [userCreated, setUserCreated] = useState([]);
  const [userAssigned, setUserAssigned] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [role, setRole] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const [isAdmin, setAdminDisabled] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const userFromServer = await fetchUser();
      setUser(userFromServer);
      setRole(userFromServer.role);
      if (userFromServer.role === "Admin") {
        setAdminDisabled(!isAdmin);
      }
    };
    const getUserCreated = async () => {
      const ticketsFromServer = await fetchUserCreatedTickets();
      setUserCreated(ticketsFromServer);
    };

    const getUserAssigned = async () => {
      const ticketsFromServer = await fetchUserAssignedTickets();
      setUserAssigned(ticketsFromServer);
    };

    const getUserProjects = async () => {
      const projectsFromServer = await fetchUserProjects();
      setUserProjects(projectsFromServer);
    };

    if (loggedInUser.lastName === "Demo") {
      setIsDemo(true);
    }

    getUserProjects();
    getUserCreated();
    getUserAssigned();
    getUser();
  }, []);
  const params = useParams();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = loggedInUser.token;

  // sends edited ticket to database
  const handleSubmit = (e) => {
    e.preventDefault();

    updateUser({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      _id: user._id,
      role,
      createdAt: user.createdAt,
    });

    toast(`User is updated`);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    window.confirm(`Delete User?`);

    toast.error(`${user.firstName} is Deleted`);
  };

  const handleRole = (event) => {
    setRole(event.target.value);
  };

  const fetchUser = async () => {
    const res = await fetch(`/api/users/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  const fetchUserCreatedTickets = async () => {
    const res = await fetch(`/api/tickets/user/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  const fetchUserAssignedTickets = async () => {
    const res = await fetch(`/api/tickets/assigned/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  const fetchUserProjects = async () => {
    const res = await fetch(`/api/projects/UserProjects/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  const handleDisable = () => {
    setDisabled(!isDisabled);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />

          <Grid
            container
            spacing={3}
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            marginTop={6}
          >
            <Grid container item xs={3}>
              <Grid item xs={12}>
                <Paper
                  elevation={7}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                  style={{ minHeight: 715 }}
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
                      <h2>User Info</h2>
                    </Paper>
                  </div>
                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <div className="singleTicketDisplay" id="ticketTitle">
                          <strong>ID: </strong>
                          {user._id}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className="singleTicketDisplay" id="ticketTitle">
                          <strong>Name:</strong> {user.firstName}{" "}
                          {user.lastName}
                        </div>
                      </Grid>

                      <Grid item xs={12}>
                        <div className="singleTicketDisplay" id="ticketTitle">
                          <strong>Email:</strong> {user.email}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <div className="singleTicketDisplay" id="ticketTitle">
                          <strong>Joined:</strong> {user.createdAt}
                        </div>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          id="ticketType"
                          margin="normal"
                          fullWidth
                          disabled={isDisabled}
                          select
                          value={role}
                          onChange={handleRole}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                Role:
                              </InputAdornment>
                            ),
                          }}
                        >
                          {RoleData.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <Divider />
                        <Button
                          variant="contained"
                          onClick={handleDisable}
                          disabled={isDemo}
                          sx={{ mt: 3, mb: 2, mr: 3 }}
                        >
                          Edit User
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
                      <Grid item xs={12}>
                        <Divider />
                        <Button
                          variant="contained"
                          color="error"
                          onClick={handleDelete}
                          disabled={isDemo}
                          sx={{ mt: 3, mb: 2, mr: 3 }}
                        >
                          Delete User
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            <Grid container item xs={9} spacing={3}>
              <Grid item xs={12} lg={6}>
                <Paper
                  elevation={7}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                  style={{ minHeight: 350 }}
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
                      <h2>Tickets Created</h2>
                    </Paper>
                  </div>
                  <Divider />
                  <CreatedTickets tickets={userCreated} />
                </Paper>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Paper
                  elevation={7}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                  style={{ minHeight: 350 }}
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
                      <h2>Assigned Tickets</h2>
                    </Paper>
                  </div>
                  <Divider />
                  <AssignedTickets tickets={userAssigned} />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  elevation={7}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: "auto",
                  }}
                  style={{ minHeight: 350 }}
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
                      <h2>Assigned Projects</h2>
                    </Paper>
                  </div>
                  <Divider />
                  <UserProjectsTable projects={userProjects} />
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default SingleUserDisplay;
