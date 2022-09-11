import { current } from "@reduxjs/toolkit";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import Title from "../../Title";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CurrentProjectManage({ project }) {
  const navigate = useNavigate();
  if (!project) {
    return (
      <>
        <Grid item xs={12}>
          <h1>No Projects Assigned</h1>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <div className="singleTicketDisplay" id="ticketTitle">
          <strong>Title:</strong> {project.title}
        </div>
      </Grid>

      <Grid item xs={12}>
        <div className="singleTicketDisplay" id="ticketTitle">
          <strong>status:</strong> {project.status}
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="singleTicketDisplay" id="ticketTitle">
          <strong>Due Date:</strong> {project.dueDate}
        </div>
      </Grid>
      <Grid item xs={12}>
        <div className="singleTicketDisplayDescCurrent" id="ticketTitle">
          <strong>Current Goal:</strong>
          <br />
          <br />
          {project.currentGoal}
        </div>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          onClick={() =>
            navigate(`/Dashboard/ProjectManage/Project/${project._id}`)
          }
          sx={{ mt: 3, mb: 2, mr: 3 }}
        >
          Details
        </Button>
      </Grid>
    </>
  );
}

export default CurrentProjectManage;
