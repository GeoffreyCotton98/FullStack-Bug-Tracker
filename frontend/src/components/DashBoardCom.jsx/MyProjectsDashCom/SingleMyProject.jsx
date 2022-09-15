import React from "react";
import {
  Grid,
  GridContainer,
  Container,
  Paper,
  Divider,
  TextField,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import DeveloperTable from "../ProjectManageDashCom/DeveloperTable";

function SingleMyProject() {
  const [manager, setPM] = useState([]);
  const [developers, setDevs] = useState([]);
  const [project, setProject] = useState([]);
  const [projectTickets, setProjectTickets] = useState([]);
  const [currentGoal, setCurrentGoal] = useState("");

  useEffect(() => {
    const getProject = async () => {
      const projectFromServer = await fetchProject();
      setProject(projectFromServer);
      setCurrentGoal(projectFromServer.currentGoal);
    };
    const getProjectTickets = async () => {
      const ticketsFromServer = await fetchProjectTickets();
      setProjectTickets(ticketsFromServer);
    };
    const getDevs = async () => {
      const devsFromServer = await fetchProjectDevelopers();
      setDevs(devsFromServer);
    };
    const getPM = async () => {
      const PMFromServer = await fetchProjectManager();
      setPM(PMFromServer);
    };

    getDevs();
    getProject();
    getProjectTickets();
    getPM();

    ///cleanup function////
  }, []);

  const params = useParams();
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const token = loggedInUser.token;

  const fetchProject = async () => {
    const res = await fetch(`/api/projects/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  const fetchProjectTickets = async () => {
    const res = await fetch(`/api/tickets/projectTickets/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data;
  };

  const fetchProjectDevelopers = async () => {
    const res = await fetch(`/api/projects/projectDevelopers/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  };

  const fetchProjectManager = async () => {
    const res = await fetch(`/api/projects/projectManager/${params.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  };

  const handleGoal = (event) => {
    setCurrentGoal(event.target.value);
  };

  const handleGoalSubmit = (e) => {
    e.preventDefault();

    toast(`Project Goal updated`);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 400,
            }}
          >
            <Grid container spacing={2}>
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
                    <h2>Details</h2>
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="singleProjectDisplay">
                  <p>
                    <strong>Project ID:</strong> {project._id}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="singleProjectDisplay">
                  <p>
                    <strong>Title:</strong> {project.title}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="singleProjectDisplay">
                  <p>
                    <strong>Due Date:</strong> {project.dueDate}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="singleProjectDisplay">
                  <p>
                    <strong>Status:</strong> {project.status}
                  </p>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 350,
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
                <h2>Developers</h2>
              </Paper>
            </div>
            <DeveloperTable developers={developers} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 350,
            }}
          >
            <Grid container spacing={2}>
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
                    <h2>Project Manager</h2>
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="singleProjectDisplay">
                  <p>
                    <strong>Name: </strong>
                    {manager.firstName} {manager.lastName}
                  </p>
                </div>
              </Grid>
              <Grid item xs={12}>
                <div className="singleProjectDisplay">
                  <p>
                    <strong>Email: </strong>
                    {manager.email}
                  </p>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 350,
            }}
          >
            <Box component="form" onSubmit={handleGoalSubmit} noValidate>
              <Grid container spacing={1}>
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
                      <h2>Current Goal</h2>
                    </Paper>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="singleProjectDisplay">
                    <p>{project.currentGoal}</p>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SingleMyProject;
