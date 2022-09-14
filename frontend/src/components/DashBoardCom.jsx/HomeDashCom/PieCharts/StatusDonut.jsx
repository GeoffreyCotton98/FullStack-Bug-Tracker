import React from "react";
import { VictoryPie } from "victory";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusDonut({ tickets }) {
  const [open, setOpen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [closed, setClose] = useState(0);

  useEffect(() => {
    const getStatus = () => {
      const statusLevels = tickets.map((ticket) => ticket.status);
      for (let i = 0; i < statusLevels.length; i++) {
        if (statusLevels[i] === "Open") {
          setOpen((prev) => prev + 1);
        }
        if (statusLevels[i] === "In-Progress") {
          setProgress((prev) => prev + 1);
        }
        if (statusLevels[i] === "Closed") {
          setClose((prev) => prev + 1);
        }
      }
    };
    getStatus();
  }, [tickets]);

  const data = {
    labels: ["Open", "In-Progress", "Closed"],
    datasets: [
      {
        label: "Tickets by Status",
        data: [open, progress, closed],
        backgroundColor: [
          "rgba(245, 88, 10, 0.6)",
          "rgba(237, 201, 97, 0.6)",
          "rgba(0, 160, 176, 0.6)",
        ],
        borderColor: [
          "rgba(245, 88, 10, 0.6)",
          "rgba(237, 201, 97, 0.6)",
          "rgba(0, 160, 176, 0.6)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <Doughnut data={data} />
    </>
  );
}

export default StatusDonut;
