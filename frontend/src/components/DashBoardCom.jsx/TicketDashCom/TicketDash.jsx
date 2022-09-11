import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import AllTicketDisplay from "./AllTicketDisplay";
import SingleTicketDisplay from "../../SingleTicketDisplay";

function TicketDash({ tickets, allUsers, updateTicket, deleteTicket }) {
  return (
    <Routes>
      <Route exact path="/" element={<AllTicketDisplay tickets={tickets} />} />
      <Route
        exact
        path="/Ticket/:id"
        element={
          <SingleTicketDisplay
            deleteTicket={deleteTicket}
            updateTicket={updateTicket}
            allUsers={allUsers}
          />
        }
      />
    </Routes>
  );
}

export default TicketDash;
