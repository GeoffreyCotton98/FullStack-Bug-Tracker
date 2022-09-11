import * as React from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Table from "@mui/material/Table";
import { TableContainer } from "@mui/material";
import { TablePagination } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import {
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import Title from "../../Title";
import PriorityIcon from "../../PriorityIcon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function preventDefault(event) {
  event.preventDefault();
}

export default function AllUsersTable({ allUsers }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searched, setSearched] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [role, setRole] = useState("All");

  useEffect(() => {
    if (role === "All") {
      setUsers(allUsers);
    }
  }, [allUsers]);

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - allUsers.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRoleFilter = (e) => {
    setRole(e.target.value);

    if (e.target.value === "All") {
      setUsers(allUsers);
    }
    if (e.target.value === "Developer") {
      const onlyDevs = allUsers.filter((user) => user.role === "Developer");
      setUsers(onlyDevs);
    }
    if (e.target.value === "Project-Manager") {
      const onlyPMs = allUsers.filter(
        (user) => user.role === "Project-Manager"
      );
      setUsers(onlyPMs);
    }
    if (e.target.value === "Admin") {
      const onlyAdmins = allUsers.filter((user) => user.role === "Admin");
      setUsers(onlyAdmins);
    }
  };

  const requestSearch = (e) => {
    setRole("All");
    setSearched(e.target.value);

    if (e.target.value === "") {
      setUsers(allUsers);
    }

    const filteredUsers = allUsers.filter((user) => {
      return (
        user.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        user.firstName.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setUsers(filteredUsers);
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
                <h2>All Users</h2>
              </Paper>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9} lg={9}>
                <TextField
                  fullWidth
                  value={searched}
                  onChange={requestSearch}
                  id="outlined-basic"
                  label="Search Name"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Filter Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Filter Role"
                    onChange={handleRoleFilter}
                  >
                    <MenuItem value={"All"}>All</MenuItem>
                    <MenuItem value={"Developer"}>Developer</MenuItem>
                    <MenuItem value={"Project-Manager"}>
                      Project-Manager
                    </MenuItem>
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell className="tableTitle">
                      <strong>Name</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Email</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Role</strong>
                    </TableCell>

                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? users.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : users
                  ).map((user) => (
                    <TableRow className="tableEl" key={user._id}>
                      <TableCell>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>

                      <TableCell>
                        <Button
                          variant="outlined"
                          onClick={() => navigate(`User/${user._id}`)}
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
                count={users.length}
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
