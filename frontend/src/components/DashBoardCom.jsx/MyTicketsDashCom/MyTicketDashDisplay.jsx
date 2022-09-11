import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import MyTicketDash from "./MyTicketDash";
import MyTicketDisplay from "./MyTicketDisplay";
import AssignedTicketDisplay from "./AssignedTicketDisplay";

function MyTicketDashDisplay({ token, updateTicket }) {
  return (
    <Routes>
      <Route exact path="/" element={<MyTicketDash token={token} />} />
      <Route
        exact
        path="/MyTicket/:id"
        element={<MyTicketDisplay updateTicket={updateTicket} />}
      />
      <Route
        exact
        path="/AssignedTicket/:id"
        element={<AssignedTicketDisplay updateTicket={updateTicket} />}
      />
    </Routes>
  );
}

export default MyTicketDashDisplay;
