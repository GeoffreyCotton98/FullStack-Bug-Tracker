import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import AllUsersTable from "./AllUsersTable";
import SingleUserDisplay from "./SingleUserDisplay";

function RoleDash({ allUsers, updateUser }) {
  return (
    <Routes>
      <Route exact path="/" element={<AllUsersTable allUsers={allUsers} />} />
      <Route
        exact
        path="/User/:id"
        element={
          <SingleUserDisplay updateUser={updateUser} allUsers={allUsers} />
        }
      />
    </Routes>
  );
}

export default RoleDash;
