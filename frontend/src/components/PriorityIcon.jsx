import React from "react";

function PriorityIcon({ ticket }) {
  return (
    <div className="priorityContainer">
      <div className={`${ticket.priority}`}></div>
      <div>{ticket.priority}</div>
    </div>
  );
}

export default PriorityIcon;
