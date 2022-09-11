import * as React from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import {
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Title from "../../Title";
import PriorityIcon from "../../PriorityIcon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function preventDefault(event) {
  event.preventDefault();
}

export default function AllProjectsTable({ projects }) {
  const navigate = useNavigate();

  const [allProjects, setAllProjects] = useState([]);
  const [status, setFilterStatus] = useState("All");
  const [searched, setSearched] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    if (status === "All") {
      setAllProjects(projects);
    }
  }, [projects]);

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - projects.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterStatus = (e) => {
    setFilterStatus(e.target.value);
    if (e.target.value === "All") {
      setAllProjects(projects);
    }
    if (e.target.value === "Development") {
      const onlyDevs = projects.filter(
        (project) => project.status === "Development"
      );
      setAllProjects(onlyDevs);
    }
    if (e.target.value === "Production") {
      const onlyProd = projects.filter(
        (project) => project.status === "Production"
      );
      setAllProjects(onlyProd);
    }
  };

  const requestSearch = (e) => {
    setFilterStatus("All");
    setSearched(e.target.value);

    if (e.target.value === "") {
      setAllProjects(projects);
    }

    const filteredProjects = projects.filter((project) => {
      return project.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setAllProjects(filteredProjects);
  };
  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            elevation={20}
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          >
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
                <h2>All Projects</h2>
              </Paper>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9} lg={9}>
                <TextField
                  fullWidth
                  value={searched}
                  onChange={requestSearch}
                  id="outlined-basic"
                  label="Search Title"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Filter Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Filter Status"
                    onChange={handleFilterStatus}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Development"}>Development</MenuItem>
                    <MenuItem value={"Production"}>Production</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableTitle">
                      <strong>Title</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Due Date</strong>
                    </TableCell>

                    <TableCell>
                      <strong>Status</strong>
                    </TableCell>

                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? allProjects.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : allProjects
                  ).map((project) => (
                    <TableRow className="tableEl" key={project._id}>
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{project.dueDate}</TableCell>

                      <TableCell>{project.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => navigate(`Project/${project._id}`)}
                        >
                          Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[0]}
                component="div"
                count={allProjects.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
