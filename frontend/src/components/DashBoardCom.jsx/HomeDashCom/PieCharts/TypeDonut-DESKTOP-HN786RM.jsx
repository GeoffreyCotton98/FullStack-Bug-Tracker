import React from "react";
import { VictoryPie, VictoryLegend } from "victory";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

function TypeDonut({ tickets }) {
  const [front, setFront] = useState(0);
  const [back, setBack] = useState(0);
  const [feature, setFeature] = useState(0);
  const [other, setOther] = useState(0);

  useEffect(() => {
    const getType = () => {
      const typeLevels = tickets.map((ticket) => ticket.type);
      for (let i = 0; i <= typeLevels.length; i++) {
        if (typeLevels[i] === "Front-End") {
          setFront((prev) => prev + 1);
        }
        if (typeLevels[i] === "Back-End") {
          setBack((prev) => prev + 1);
        }
        if (typeLevels[i] === "Feature") {
          setFeature((prev) => prev + 1);
        }
        if (typeLevels[i] === "Other") {
          setOther((prev) => prev + 1);
        }
      }
    };

    getType();
  }, [tickets]);

  const data = {
    labels: ["Front-End", "Back-End", "Feature", "Other"],
    datasets: [
      {
        label: "Tickets by Type",
        data: [front, back, feature, other],
        backgroundColor: [
          "rgba(0, 160, 176, 0.6)",
          "rgba(237, 201, 97, 0.6)",
          "rgba(245, 88, 10, 0.6)",
          "rgba(245, 0, 0, 0.6)",
        ],
        borderColor: [
          "rgba(0, 160, 176, 0.6)",
          "rgba(237, 201, 97, 0.6)",
          "rgba(245, 88, 10, 0.6)",
          "rgba(245, 0, 0, 0.6)",
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

export default TypeDonut;
