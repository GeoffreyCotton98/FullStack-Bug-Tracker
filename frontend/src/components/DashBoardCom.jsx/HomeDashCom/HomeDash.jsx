import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";

import TypeDonut from "./PieCharts/TypeDonut-DESKTOP-HN786RM";
import PriorityDonut from "./PieCharts/PriorityDonut";
import StatusDonut from "./PieCharts/StatusDonut";
import { UserBarChart } from "./UserBarChart";
import { ProjectBarChart } from "./ProjectBarChart";

import Title from "../../Title";
import { Divider } from "@mui/material";
import { useState, useEffect } from "react";

function HomeDash({ allUsers, tickets, projects, user }) {
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              backgroundImage:
                "linear-gradient(to top right, #FAC213 , #F77E21)",
            }}
          >
            <div className="totalHeader">Total Projects:</div>
            <div className="totalData">{projects.length}</div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              backgroundImage:
                "linear-gradient(to top right, #A85CF9 , #371B58)",
            }}
          >
            <div className="totalHeader">Total Tickets:</div>
            <div className="totalData">{tickets.length}</div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              backgroundImage:
                "linear-gradient(to top right, #3D8361 , #1C6758)",
            }}
          >
            <div className="totalHeader">Total Users:</div>
            <div className="totalData">{allUsers.length}</div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              backgroundImage:
                "linear-gradient(to top right, #0093AB , #006778)",
            }}
          >
            <div className="totalHeader">Role:</div>
            <div className="totalData">{user.role}</div>
          </Paper>
        </Grid>

        {/*Ticket displays*/}
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "auto",
            }}
          >
            <Title>Users by Role</Title>
            <Divider />
            <UserBarChart users={allUsers} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "auto",
            }}
          >
            <Title>Projects by Status</Title>
            <Divider />
            <ProjectBarChart projects={projects} />
          </Paper>
        </Grid>
        {/*Pie Charts */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "auto",
            }}
          >
            <Title>Tickets by Type</Title>
            <Divider />
            <TypeDonut tickets={tickets} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "min-content",
            }}
          >
            <Title>Tickets by Priority</Title>
            <Divider />
            <PriorityDonut tickets={tickets} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            elevation={7}
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "auto",
            }}
          >
            <Title>Tickets by Status</Title>
            <Divider />
            <StatusDonut tickets={tickets} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomeDash;
