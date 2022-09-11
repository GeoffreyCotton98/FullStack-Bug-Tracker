import * as React from "react";
import { Link } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import { TablePagination } from "@mui/material";
import { Pagination } from "@mui/material";
import { TableFooter } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";
import Title from "../../Title";
import PriorityIcon from "../../PriorityIcon";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function preventDefault(event) {
  event.preventDefault();
}

export default function ProjectTicketTable({ tickets }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);

  // Avoid a layout jump when reaching the last page with empty rows.

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const navigate = useNavigate();

  if (!tickets) {
    return <h1>No Tickets Created</h1>;
  }

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className="tableTitle">
                <strong>Title</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>

              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tickets.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tickets
            ).map((ticket) => (
              <TableRow className="tableEl" key={ticket._id}>
                <TableCell style={{ width: 500 }}>{ticket.title}</TableCell>
                <TableCell tyle={{ width: 250 }}>{ticket.status}</TableCell>

                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(`/Dashboard/Tickets/Ticket/${ticket._id}`)
                    }
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow className="tableEl" style={{ height: 53 * emptyRows }}>
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[0]}
          component="div"
          count={tickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
