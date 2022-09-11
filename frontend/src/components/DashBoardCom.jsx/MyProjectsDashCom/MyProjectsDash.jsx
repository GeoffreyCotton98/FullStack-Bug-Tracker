import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import MyProjectDashDisplay from "./MyProjectDashDisplay";
import SingleMyProject from "./SingleMyProject";

function MyProjectsDash({ allUsers, updateUser }) {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<MyProjectDashDisplay allUsers={allUsers} />}
      />
      <Route
        exact
        path="/MyProject/:id"
        element={
          <SingleMyProject updateUser={updateUser} allUsers={allUsers} />
        }
      />
    </Routes>
  );
}

export default MyProjectsDash;
