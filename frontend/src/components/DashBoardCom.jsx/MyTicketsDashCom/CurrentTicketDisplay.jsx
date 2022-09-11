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

function MyTicketSingleDisplay({ ticket }) {
  const navigate = useNavigate();

  const HandleClose = (e) => {
    navigate(`/Dashboard/MyTickets`);

    toast(`Ticket is Closed`);
  };

  if (!ticket) {
    return <h1>No Tickets Assigned</h1>;
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <div className="singleTicketDisplay" id="ticketTitle">
            <strong>Title:</strong> {ticket.title}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="singleTicketDisplayDescCurrent" id="ticketTitle">
            <strong>Description:</strong>
            <br />
            <br />
            {ticket.description}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="singleTicketDisplay" id="ticketTitle">
            <strong>Priority:</strong> {ticket.priority}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="singleTicketDisplay" id="ticketTitle">
            <strong>Due Date:</strong> {ticket.dueDate}
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className="singleTicketDisplay" id="ticketTitle">
            <strong>Type:</strong> {ticket.type}
          </div>
        </Grid>

        <Grid item xs={12}>
          <div className="singleTicketDisplay" id="ticketTitle">
            <strong>Due Date:</strong> {ticket.dueDate}
          </div>
        </Grid>
        <Grid item xs={12}>
          <Divider />
          <Button
            variant="contained"
            onClick={() =>
              navigate(`/Dashboard/MyTickets/AssignedTicket/${ticket._id}`)
            }
            sx={{ mt: 3, mb: 2, mr: 3 }}
          >
            Close Ticket
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default MyTicketSingleDisplay;
