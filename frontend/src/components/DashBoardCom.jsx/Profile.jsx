import React from "react";
import { Grid, Container, Paper, Box, Divider } from "@mui/material";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              elevation={7}
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
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
                      <h2>My Profile</h2>
                    </Paper>
                  </div>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <div className="singleTicketDisplay" id="ticketTitle">
                    <strong>My ID:</strong> {user._id}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="singleTicketDisplay" id="ticketTitle">
                    <strong>Name:</strong> {user.firstName} {user.lastName}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <div className="singleTicketDisplay" id="ticketTitle">
                    <strong>Email:</strong> {user.email}
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className="singleTicketDisplay" id="ticketTitle">
                    <strong>Role:</strong> {user.role}
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
