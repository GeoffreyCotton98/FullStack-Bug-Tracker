import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function PriorityDonut({ tickets }) {
  const [low, setLow] = useState(0);
  const [med, setMed] = useState(0);
  const [high, setHigh] = useState(0);
  const [urgent, setUrgent] = useState(0);

  useEffect(() => {
    const getPriority = () => {
      const priorityLevels = tickets.map((ticket) => ticket.priority);

      for (let i = 0; i < priorityLevels.length; i++) {
        if (priorityLevels[i] === "low") {
          setLow((prev) => prev + 1);
        }
        if (priorityLevels[i] === "medium") {
          setMed((prev) => prev + 1);
        }
        if (priorityLevels[i] === "high") {
          setHigh((prev) => prev + 1);
        }
        if (priorityLevels[i] === "urgent") {
          setUrgent((prev) => prev + 1);
        }
      }
    };

    getPriority();
  }, [tickets]);

  const data = {
    labels: ["Low", "Medium", "High", "Urgent"],
    datasets: [
      {
        label: "Tickets by Priority",
        data: [low, med, high, urgent],
        backgroundColor: [
          "rgba(0, 160, 176, 0.6)",
          "rgba(237, 201, 97, 0.6)",
          "rgba(245, 88, 10, 0.6)",
          "rgba(245, 0, 0, 0.6)",
        ],
        borderColor: [
          "rgba(0, 160, 176, 0.6)",
          "rgba(237, 201, 97, 0.6)",
          "rgba(235, 88, 65, 0.6)",
          "rgba(204, 51, 63, 0.6)",
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

export default PriorityDonut;
