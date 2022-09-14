import React from "react";

//MUI components
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

//custom components
import { Routes, Route, useParams } from "react-router-dom";
import HomeDash from "../components/DashBoardCom.jsx/HomeDashCom/HomeDash";

import MyTicketDisplay from "../components/DashBoardCom.jsx/MyTicketsDashCom/MyTicketDisplay";
import AssignedTicketDisplay from "../components/DashBoardCom.jsx/MyTicketsDashCom/AssignedTicketDisplay";
import MyTicketDashDisplay from "../components/DashBoardCom.jsx/MyTicketsDashCom/MyTicketDashDisplay";
import RoleDash from "../components/DashBoardCom.jsx/RoleDashCom/RoleDash";
import TicketDash from "../components/DashBoardCom.jsx/TicketDashCom/TicketDash";
import SingleUserDisplay from "../components/DashBoardCom.jsx/RoleDashCom/SingleUserDisplay";
import TicketForm from "../components/DashBoardCom.jsx/TicketForm";
import SingleTicketDisplay from "../components/SingleTicketDisplay";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";

import CreateProjectForm from "../components/DashBoardCom.jsx/CreateProjectsDashCom/CreateProjectForm";
import AllProjectDash from "../components/DashBoardCom.jsx/AllProjectsDash/AllProjectsDash";
import SingleProjectDisplay from "../components/DashBoardCom.jsx/AllProjectsDash/SingleProjectDisplay";
import MyProjectsDash from "../components/DashBoardCom.jsx/MyProjectsDashCom/MyProjectsDash";
import SingleMyProject from "../components/DashBoardCom.jsx/MyProjectsDashCom/SingleMyProject";

import ProjectManageDash from "../components/DashBoardCom.jsx/ProjectManageDashCom/ProjectManageDash";
import ProjectManageDisplay from "../components/DashBoardCom.jsx/ProjectManageDashCom/ProjectManageDisplay";
import TicketProject from "../components/DashBoardCom.jsx/ProjectManageDashCom/TicketProject";
import Profile from "../components/DashBoardCom.jsx/Profile";
import EditProject from "../components/DashBoardCom.jsx/AllProjectsDash/EditProject";
const mdTheme = createTheme();

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const params = useParams();

  const user = JSON.parse(localStorage.getItem("user"));

  const token = user.token;

  useEffect(() => {
    const getAllTickets = async () => {
      const ticketsFromServer = await fetchTickets();
      const displayTickets = ticketsFromServer.reverse();
      setTickets(displayTickets);
    };

    const getAllUsers = async () => {
      const usersFromServer = await fetchAllUsers();
      setAllUsers(usersFromServer);
    };

    const getProjects = async () => {
      const projectsFromServer = await fetchProjects();
      const displayProjects = projectsFromServer.reverse();
      setProjects(displayProjects);
    };

    getProjects();

    getAllUsers();
    getAllTickets();
  }, []);

  ////////Tickets///////////////////////

  //fetch  all tickets
  //admins only
  const fetchTickets = async () => {
    const res = await fetch("http://localhost:5000/api/tickets/ticketsAdmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  };

  //add ticket
  const addTicket = async (ticket) => {
    const res = await fetch("http://localhost:5000/api/tickets", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(ticket),
    });

    const data = await res.json();

    setTickets([data, ...tickets]);
  };

  const updateTicket = async (updatedTicket) => {
    const res = await fetch(`http://localhost:5000/api/tickets/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTicket),
    });

    const updateTicketsState = tickets.map((ticket) => {
      if (ticket._id === params.id) {
        return updatedTicket;
      }

      return ticket;
    });

    setTickets(updateTicketsState);
  };

  const deleteTicket = async (id) => {
    setTickets(tickets.filter((ticket) => ticket._id !== id));

    const res = await fetch(`http://localhost:5000/api/tickets/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  };

  //////////////Users/////////////////////

  //fetch all users
  //admins only
  const fetchAllUsers = async () => {
    const res = await fetch("http://localhost:5000/api/users/usersAll", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return data;
  };

  const updateUser = async (updatedUser) => {
    const res = await fetch(`http://localhost:5000/api/users/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedUser),
    });

    const updateUsersState = allUsers.map((user) => {
      if (user._id === params.id) {
        return updatedUser;
      }

      return user;
    });

    setAllUsers(updateUsersState);
  };

  const DeleteUser = async (id) => {
    setAllUsers(allUsers.filter((user) => user._id !== id));
    const res = await fetch(`http://localhost:5000/api/users/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
  };

  //////////////////Projects/////////////////

  //Create Project
  const addProject = async (project) => {
    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(project),
    });

    const data = await res.json();

    setProjects([data, ...projects]);
  };

  //fetch  all Projects
  //admins only
  const fetchProjects = async () => {
    const res = await fetch(
      "http://localhost:5000/api/projects/projectsAdmin",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    return data;
  };

  //update Projects
  const updateProject = async (updatedProject) => {
    const res = await fetch(`http://localhost:5000/api/projects/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedProject),
    });

    const updateProjectsState = projects.map((project) => {
      if (project._id === params.id) {
        return updatedProject;
      }

      return project;
    });

    setProjects(updateProjectsState);
  };

  //Delete Project//
  const DeleteProject = async (id) => {
    setProjects(projects.filter((project) => project._id !== id));
    const res = await fetch(`http://localhost:5000/api/projects/${params.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
  };

  if (!user) {
    return (
      <>
        <h1>Not Logged in</h1>
      </>
    );
  }

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <NavBar />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[200]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Routes>
              <Route
                path="Home"
                element={
                  <HomeDash
                    allUsers={allUsers}
                    tickets={tickets}
                    projects={projects}
                    user={user}
                  />
                }
              />

              <Route
                path="CreateProject"
                element={
                  <CreateProjectForm addProject={addProject} users={allUsers} />
                }
              />

              <Route
                exact
                path="Projects/*"
                element={
                  <AllProjectDash
                    users={allUsers}
                    projects={projects}
                    updateProject={updateProject}
                  />
                }
              >
                <Route
                  exact="Project/:id"
                  element={<SingleProjectDisplay users={allUsers} />}
                />

                <Route
                  exact="EditProject/:id"
                  element={<EditProject users={allUsers} />}
                />
              </Route>

              <Route
                exact
                path="MyProjects/*"
                element={
                  <MyProjectsDash users={allUsers} projects={projects} />
                }
              >
                <Route exact="MyProject/:id" element={<SingleMyProject />} />
              </Route>

              <Route
                exact
                path="MyTickets/*"
                element={
                  <MyTicketDashDisplay
                    updateTicket={updateTicket}
                    allUsers={allUsers}
                    tickets={tickets}
                    token={token}
                  />
                }
              >
                <Route
                  exact="MyTicket/:id"
                  element={
                    <MyTicketDisplay allUsers={allUsers} tickets={tickets} />
                  }
                />
                <Route
                  exact="AssignedTicket/:id"
                  element={
                    <AssignedTicketDisplay
                      allUsers={allUsers}
                      tickets={tickets}
                    />
                  }
                />
              </Route>

              <Route
                exact
                path="RoleManage/*"
                element={
                  <RoleDash
                    allUsers={allUsers}
                    updateUser={updateUser}
                    tickets={tickets}
                  />
                }
              >
                <Route exact="User/:id" element={<SingleUserDisplay />} />
              </Route>

              <Route
                exact
                path="ProjectManage/*"
                element={
                  <ProjectManageDash
                    updateProject={updateProject}
                    updateTicket={updateTicket}
                    deleteTicket={deleteTicket}
                  />
                }
              >
                <Route path="Project/:id" element={<ProjectManageDisplay />} />
                <Route path="Ticket/:id" element={<TicketProject />} />
              </Route>

              <Route
                exact
                path="Tickets/*"
                element={
                  <TicketDash
                    updateTicket={updateTicket}
                    deleteTicket={deleteTicket}
                    tickets={tickets}
                    allUsers={allUsers}
                  />
                }
              >
                <Route
                  exact="Ticket/:id"
                  element={<SingleTicketDisplay allUsers={allUsers} />}
                />
              </Route>

              <Route
                exact
                path="Report"
                element={
                  <TicketForm
                    onAdd={addTicket}
                    loggedInUser={user}
                    projects={projects}
                  />
                }
              />
              <Route exact path="Profile" element={<Profile />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Dashboard;
