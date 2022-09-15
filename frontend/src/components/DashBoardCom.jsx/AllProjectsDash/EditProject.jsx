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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { InputAdornment, MenuItem } from "@mui/material";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import Title from "../../Title";
import TeamSelect from "../CreateProjectsDashCom/TeamSelect";

const theme = createTheme();

function EditProject({ users, updateProject }) {
  const [project, setProject] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [dueDate, setDate] = useState("");

  const [projectManager, setPM] = useState("Front-End");
  const [team, setTeam] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const getProject = async () => {
      const projectFromServer = await fetchProject();
      setProject(projectFromServer);
      setTitle(projectFromServer.title);
      setDesc(projectFromServer.description);
      setDate(projectFromServer.dueDate);
      setPM(projectFromServer.projectManager);
      setTeam(projectFromServer.team);
    };
    getProject();
  }, []);

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

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleDesc = (event) => {
    setDesc(event.target.value);
  };

  const handleDate = (event) => {
    setDate(event.target.value);
  };

  const handlePM = (event) => {
    setPM(event.target.value);
  };

  //sends edited ticket to database
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "" || description === "" || dueDate === "") {
      toast.error("please fill out all fields");
      return;
    } else {
      updateProject({
        id: project._id,
        title,
        description,
        dueDate,
        status: "Development",
        projectManager,
        team,
      });
      toast(`Project has been updated`);

      navigate("/Dashboard/Projects");
    }
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
                    <h2>Edit Project</h2>
                  </Paper>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="title"
                      label="Title"
                      name="Title"
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
                  <Grid item xs={12} md={6} lg={6}>
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

                  <Grid item xs={12} md={6} lg={6}>
                    <TextField
                      id="ticketType"
                      margin="normal"
                      fullWidth
                      select
                      value={projectManager}
                      onChange={handlePM}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            Project Manager:
                          </InputAdornment>
                        ),
                      }}
                    >
                      {users
                        .filter((user) => user.role !== "Developer")
                        .map((user) => (
                          <MenuItem key={user._id} value={user._id}>
                            {user.lastName}, {user.firstName}
                          </MenuItem>
                        ))}
                    </TextField>
                  </Grid>

                  <Grid item xs={12}>
                    <TeamSelect users={users} setTeam={setTeam} team={team} />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Re-submit
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

export default EditProject;
