import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement);

export function ProjectBarChart({ projects }) {
  const [development, setDev] = useState(0);
  const [production, setProd] = useState(0);

  useEffect(() => {
    const getStatus = () => {
      const projectsStatus = projects.map((project) => project.status);

      for (let i = 0; i < projectsStatus.length; i++) {
        if (projectsStatus[i] === "Development") {
          setDev((prev) => prev + 1);
        }
        if (projectsStatus[i] === "Production") {
          setProd((prev) => prev + 1);
        }
      }
    };

    getStatus();
  }, [projects]);

  const labels = ["Development", "Production"];

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [development, production],
        backgroundColor: ["#F77E21", "#3D8361"],
      },
    ],
  };

  return <Bar data={data} />;
}
