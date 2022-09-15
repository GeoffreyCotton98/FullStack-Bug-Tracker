import { Paper, Divider, Grid, Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Title from "../../Title";
import TableProjectManage from "./TableProjectManage";
import CurrentProjectManage from "./CurrentProjectManage";

import { useState, useEffect } from "react";

function ProjectManageDashDisplay() {
  const [projects, setProjects] = useState([]);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const projectsFromServer = await fetchProjectManagerProjects();
      setProjects(projectsFromServer);
    };
    const getCurrent = async () => {
      const projectsFromServer = await fetchProjectManagerProjects();
      const mostCurrentProject =
        projectsFromServer[projectsFromServer.length - 1];
      setCurrent(mostCurrentProject);
    };

    getCurrent();
    getProjects();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const token = user.token;

  const fetchProjectManagerProjects = async () => {
    const res = await fetch(
      `http://localhost:5000/api/projects/projectManagerProjects`,
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
                    <CurrentProjectManage project={current} />
                  </Grid>
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
                      <h2>Assigned as Manager</h2>
                    </Paper>
                  </div>
                  <Divider />
                  <TableProjectManage projects={projects} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProjectManageDashDisplay;
