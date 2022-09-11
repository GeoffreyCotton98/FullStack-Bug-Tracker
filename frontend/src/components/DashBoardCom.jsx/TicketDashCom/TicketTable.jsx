import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import PriorityIcon from "../../PriorityIcon";
import Title from "../../Title";
import { Divider } from "@mui/material";

export default function AllTicketDisplay({ tickets }) {
  const rows = tickets.map(function (ticket, index) {
    return {
      id: index,
      col1: ticket.title,
      col2: ticket.dueDate,
      col3: ticket.priority,
      col4: ticket.status,
      col5: ticket.type,
    };
  });

  const columns = [
    { field: "id", hide: true },
    { field: "col1", headerName: "Title", width: 285 },
    { field: "col2", headerName: "Due Date", width: 285 },
    { field: "col3", headerName: "Priority", width: 285 },
    { field: "col4", headerName: "Status", width: 285 },
    { field: "col5", headerName: "Type", width: 285 },
  ];
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
