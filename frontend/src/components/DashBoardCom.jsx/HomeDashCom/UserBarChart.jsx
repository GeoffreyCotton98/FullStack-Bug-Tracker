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

export function UserBarChart({ users }) {
  const [admins, setAdmins] = useState(0);
  const [projectm, setManagers] = useState(0);
  const [devs, setDevs] = useState(0);
  const [subs, setSub] = useState(0);

  useEffect(() => {
    const getRoles = () => {
      const usersRoles = users.map((user) => user.role);

      for (let i = 0; i < usersRoles.length; i++) {
        if (usersRoles[i] === "Admin") {
          setAdmins((prev) => prev + 1);
        }
        if (usersRoles[i] === "Project-Manager") {
          setManagers((prev) => prev + 1);
        }
        if (usersRoles[i] === "Developer") {
          setDevs((prev) => prev + 1);
        }
        if (usersRoles[i] === "Submitter") {
          setSub((prev) => prev + 1);
        }
      }
    };

    getRoles();
  }, [users]);

  const labels = ["Admin", "Project-Manager", "Developer", "Submitter"];

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: [admins, projectm, devs, subs],
        backgroundColor: ["#F77E21", "#A85CF9", "#0093AB", "#3D8361"],
      },
    ],
  };

  return <Bar data={data} />;
}
