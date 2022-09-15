import { Paper, Divider, Grid, Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Title from "../../Title";
import CurrentProjectDisplay from "./CurrentProjectDisplay";
import AssignedProjectsTable from "./AssignedProjectsTable";
import { useState, useEffect } from "react";

function MyProjectDashDisplay() {
  const [myProjects, setMyProjects] = useState([]);
  const [currentProject, setCurrent] = useState([]);

  useEffect(() => {
    const getMyProjects = async () => {
      const projectsFromServer = await fetchMyProjects();
      setMyProjects(projectsFromServer);
      const mostCurrentProject =
        projectsFromServer[projectsFromServer.length - 1];
      setCurrent(mostCurrentProject);
    };

    getMyProjects();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const token = user.token;

  const fetchMyProjects = async () => {
    const res = await fetch("/api/projects/MyProjects", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={7}>
            <Paper
              elevation={7}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                minHeight: 700,
              }}
            >
              <Grid container spacing={3}>
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
                      <h2>Current Project</h2>
                    </Paper>
                  </div>
                  <Divider />
                </Grid>

                <CurrentProjectDisplay project={currentProject} />
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
                minHeight: 400,
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
                      <h2>Assigned as Developer</h2>
                    </Paper>
                  </div>
                  <Divider />
                </Grid>
                <AssignedProjectsTable projects={myProjects} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default MyProjectDashDisplay;
