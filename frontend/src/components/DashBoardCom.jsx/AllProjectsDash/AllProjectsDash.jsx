import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import AllProjectsTable from "./AllProjectsTable";
import SingleProjectDisplay from "./SingleProjectDisplay";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function AllProjectDash({ users, projects, updateProject }) {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={<AllProjectsTable projects={projects} />}
      />
      <Route
        exact
        path="/Project/:id"
        element={
          <SingleProjectDisplay users={users} updateProject={updateProject} />
        }
      />
    </Routes>
  );
}

export default AllProjectDash;
