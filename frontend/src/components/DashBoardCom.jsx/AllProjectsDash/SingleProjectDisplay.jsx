import React from "react";
import { Grid, Container, Paper } from "@mui/material";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import ProjectTicketTable from "./ProjectTicketTable";
import ProjectDeveloperTable from "./ProjectDevelopersTable";
import { toast } from "react-toastify";

function SingleProjectDisplay({ users, updateProject }) {
  const [manager, setPM] = useState([]);
  const [addUser, setAddUser] = useState("");
  const [developers, setDevs] = useState([]);
  const [project, setProject] = useState([]);
  const [isProduction, setProductionDisabled] = useState(false);
  const [isDemo, setDemo] = useState(false);
  const [projectTickets, setProjectTickets] = useState([]);

  useEffect(() => {
    if (loggedInUser.lastName === "Demo") {
      setDemo(true);
    }
    const getProject = async () => {
      const projectFromServer = await fetchProject();
      setProject(projectFromServer);
      if (loggedInUser.lastName === "Demo") {
        setProductionDisabled(true);
      }
    };
    const getProjectTickets = async () => {
      const ticketsFromServer = await fetchProjectTickets();
      const displayTickets = ticketsFromServer.reverse();
      setProjectTickets(displayTickets);
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

  //add project User
  const addProjectUser = async () => {
    const res = await fetch(`/api/projects/addProjectUser/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    setDevs([...developers, data]);
  };

  const handleAddUserInput = (e) => {
    setAddUser(e.target.value);
  };

  const handleUpdateProject = (e) => {
    e.preventDefault();

    updateProject({
      _id: project._id,
      title: project.title,
      description: project.description,
      dueDate: project.dueDate,
      status: "Production",
    });

    navigate("/Dashboard/Projects");

    toast("Project is now is Production");
  };

  const handleEditProject = () => {
    window.confirm("do you want to edit this project?");

    navigate(`/Dashboard/Projects/EditProject/${project._id}`);
  };

  // const HandleAddProjectUser = () => {
  //   addProjectUser({
  //     addUser,
  //   });

  //   toast("Developer has been added");
  // };
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
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
        <Grid item xs={12} lg={6}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 400,
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
                <h2>Project Tickets</h2>
              </Paper>
            </div>
            <ProjectTicketTable tickets={projectTickets} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
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
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={() =>
                    navigate(`/Dashboard/RoleManage/User/${manager._id}`)
                  }
                >
                  Details
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={5}>
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

            <Grid container>
              <Grid item xs={12}>
                <ProjectDeveloperTable developers={developers} users={users} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              minHeight: 350,
            }}
          >
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
                    <h2>Description</h2>
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={12}>
                {project.description}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Button
            variant="contained"
            color="success"
            disabled={isProduction}
            onClick={handleUpdateProject}
            sx={{
              mr: 2,
            }}
          >
            Deploy Project
          </Button>
          <Button
            variant="contained"
            disabled={isDemo}
            onClick={handleEditProject}
            sx={{
              mr: 2,
            }}
          >
            Edit Project
          </Button>
          <Button
            variant="contained"
            disabled={isDemo}
            color="error"
            onClick={handleUpdateProject}
          >
            Delete Project
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default SingleProjectDisplay;
