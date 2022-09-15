import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";

import CssBaseline from "@mui/material/CssBaseline";

import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useState, useEffect } from "react";
import CurrentTicketDisplay from "./CurrentTicketDisplay";
import AssignedTicketTable from "./AssignedTicketTable";
import CreatedTicketTable from "./CreatedTicketTable";

const theme = createTheme();

function MyTicketDash({ token }) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [userCreated, setUserCreated] = useState([]);
  const [userAssigned, setUserAssigned] = useState([]);
  const [currentTicket, setCurrent] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const loggedInUser = await fetchLoggedInUser();
      setUser(loggedInUser);
    };
    const getUserCreated = async () => {
      const ticketsFromServer = await fetchUserCreatedTickets();
      const displayTickets = ticketsFromServer.reverse();
      setUserCreated(displayTickets);
    };

    const getUserAssigned = async () => {
      const ticketsFromServer = await fetchUserAssignedTickets();
      const displayTickets = ticketsFromServer.reverse();
      setUserAssigned(displayTickets);
      const mostCurrentProject = displayTickets[0];
      setCurrent(mostCurrentProject);
    };

    getUserCreated();
    getUserAssigned();
    getUser();
  }, []);

  const fetchLoggedInUser = async () => {
    const res = await fetch(`/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  const fetchUserCreatedTickets = async () => {
    const res = await fetch(`/api/tickets/userTickets`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  const fetchUserAssignedTickets = async () => {
    const res = await fetch(`/api/tickets/assignedTickets`, {
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
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <CssBaseline />

          <div>
            <Grid
              container
              spacing={3}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid container item xs={4} spacing={1}>
                <Grid item xs={12}>
                  <Paper
                    elevation={7}
                    sx={{
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                    style={{ minHeight: 765 }}
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
                        <h2>Most Recent</h2>
                      </Paper>
                    </div>

                    <CurrentTicketDisplay
                      ticket={currentTicket}
                      token={token}
                    />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container item xs={8} spacing={3}>
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
                        <h2>Created by Me</h2>
                      </Paper>
                    </div>
                    <CreatedTicketTable tickets={userCreated} />
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
                        <h2>Assigned to Me</h2>
                      </Paper>
                    </div>
                    <AssignedTicketTable tickets={userAssigned} user={user} />
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default MyTicketDash;
