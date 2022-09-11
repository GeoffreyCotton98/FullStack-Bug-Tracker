import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import ProjectManageDashDisplay from "./ProjectManageDashDisplay";
import ProjectManageDisplay from "./ProjectManageDisplay";
import TicketProject from "./TicketProject";

function ProjectManageDash({ updateProject, updateTicket, deleteTicket }) {
  return (
    <Routes>
      <Route exact path="/" element={<ProjectManageDashDisplay />} />
      <Route
        exact
        path="/Project/:id"
        element={<ProjectManageDisplay updateProject={updateProject} />}
      />
      <Route
        exact
        path="/Ticket/:id"
        element={
          <TicketProject
            updateTicket={updateTicket}
            deleteTicket={deleteTicket}
          />
        }
      />
    </Routes>
  );
}

export default ProjectManageDash;
