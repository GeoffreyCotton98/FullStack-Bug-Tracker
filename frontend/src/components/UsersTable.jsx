import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import PriorityIcon from "./PriorityIcon";

function preventDefault(event) {
  event.preventDefault();
}

export default function UsersTable({ allUsers }) {
  return (
    <React.Fragment>
      <Title>All Users</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Name</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell>
              <strong>Role</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(allUsers || []).map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                {user.lastName}, {user.firstName}{" "}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        href="/Tickets"
        onClick={preventDefault}
        sx={{ mt: 3 }}
      >
        See more Tickets
      </Link>
    </React.Fragment>
  );
}
