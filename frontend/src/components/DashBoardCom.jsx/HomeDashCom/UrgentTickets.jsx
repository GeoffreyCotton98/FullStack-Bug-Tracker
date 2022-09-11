import React from "react";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Divider } from "@mui/material";

function UrgentTickets({ tickets }) {
  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={7} sx={{ p: 2 }}>
              hello
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={7} sx={{ p: 2 }}>
              hello
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default UrgentTickets;
