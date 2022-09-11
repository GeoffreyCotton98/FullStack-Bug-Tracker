import * as React from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../../Title";
import PriorityIcon from "../../PriorityIcon";
import { Navigate } from "react-router-dom";

function TicketItem({ ticket }) {
  return (
    <TableRow className="tableRow">
      <TableCell className="tableCell">{ticket.title}</TableCell>
      <TableCell>{ticket.dueDate}</TableCell>
      <TableCell>
        <PriorityIcon ticket={ticket} />
      </TableCell>
      <TableCell>{ticket.status}</TableCell>
      <TableCell>{ticket.type}</TableCell>
      <TableCell>
        <Link to={`Ticket/${ticket._id}`}>details</Link>
      </TableCell>
    </TableRow>
  );
}

export default TicketItem;
