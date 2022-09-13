import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  SideBarDataAdmin,
  SideBarDataDeveloper,
  SideBarDataProjectManager,
  SideBarDataSubmitter,
} from "./SideBarData";
import { Link } from "react-router-dom";

function SideBarLinks() {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  if (loggedInUser.role === "Admin") {
    return (
      <>
        {SideBarDataAdmin.map((item, index) => {
          return (
            <Link to={item.path} key={index}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
          );
        })}
      </>
    );
  }
  if (loggedInUser.role === "Project-Manager") {
    return (
      <>
        {SideBarDataProjectManager.map((item, index) => {
          return (
            <Link to={item.path} key={index}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
          );
        })}
      </>
    );
  }

  if (loggedInUser.role === "Developer") {
    return (
      <>
        {SideBarDataDeveloper.map((item, index) => {
          return (
            <Link to={item.path} key={index}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
          );
        })}
      </>
    );
  }

  if (loggedInUser.role === "Submitter") {
    return (
      <>
        {SideBarDataSubmitter.map((item, index) => {
          return (
            <Link to={item.path} key={index}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </Link>
          );
        })}
      </>
    );
  }
}

export default SideBarLinks;
