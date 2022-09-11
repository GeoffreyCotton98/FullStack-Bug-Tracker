import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import PriorityIcon from "../../PriorityIcon";
import Title from "../../Title";
import { Divider } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TablePages({ tickets }) {
  const navigate = useNavigate();
  const rows = tickets.map(function (ticket, index) {
    return {
      id: index,
      col1: ticket.title,
      col2: ticket.priority,
      col3: (
        <Button
          variant="outlined"
          onClick={() =>
            navigate(`/Dashboard/MyTickets/MyTicket/${ticket._id}`)
          }
        >
          Details
        </Button>
      ),
    };
  });

  const columns = [
    { field: "id", hide: true },
    { field: "col1", headerName: "Title", width: 240 },

    { field: "col2", headerName: "Priority", width: 240 },
    { field: "col3", headerName: "Details", width: 240 },
  ];
  return (
    <div style={{ height: 350, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={4}
        rowsPerPageOptions={4}
      />
    </div>
  );
}
