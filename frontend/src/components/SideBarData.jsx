import * as React from "react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BugReportIcon from "@mui/icons-material/BugReport";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleIcon from "@mui/icons-material/People";
import ViewListIcon from "@mui/icons-material/ViewList";
import ReportIcon from "@mui/icons-material/Report";
import GroupsIcon from "@mui/icons-material/Groups";
import CreateIcon from "@mui/icons-material/Create";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import TaskIcon from "@mui/icons-material/Task";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ReceiptIcon from "@mui/icons-material/Receipt";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

export const SideBarDataAdmin = [
  {
    id: 1,
    title: "Dashboard Home",
    path: "/Dashboard/Home",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    title: "Create Project",
    path: "/Dashboard/CreateProject",
    icon: <CreateIcon />,
  },
  {
    id: 3,
    title: "Manage All Projects",
    path: "/Dashboard/Projects",
    icon: <AssessmentIcon />,
  },

  {
    id: 4,
    title: "Manage All Users",
    path: "/Dashboard/RoleManage",
    icon: <GroupsIcon />,
  },
  {
    id: 5,
    title: "Manage All Tickets",
    path: "/Dashboard/Tickets",
    icon: <BugReportIcon />,
  },

  {
    id: 6,
    title: "Manage Projects",
    path: "/Dashboard/ProjectManage",
    icon: <SummarizeIcon />,
  },
  {
    id: 8,
    title: "My Tickets",
    path: "/Dashboard/MyTickets",
    icon: <ReceiptIcon />,
  },

  {
    id: 9,
    title: "Submit Ticket",
    path: "/Dashboard/Report",
    icon: <ReportIcon />,
  },
  {
    id: 10,
    title: "My Profile",
    path: "/Dashboard/Profile",
    icon: <ManageAccountsIcon />,
  },
];

export const SideBarDataProjectManager = [
  {
    id: 1,
    title: "Dashboard Home",
    path: "/Dashboard/Home",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    title: "Manage Projects",
    path: "/Dashboard/ProjectManage",
    icon: <SummarizeIcon />,
  },
  {
    id: 3,
    title: "My Projects",
    path: "/Dashboard/MyProjects",
    icon: <AssessmentIcon />,
  },
  {
    id: 4,
    title: "My Tickets",
    path: "/Dashboard/MyTickets",
    icon: <ReceiptIcon />,
  },
  {
    id: 5,
    title: "Submit Ticket",
    path: "/Dashboard/Report",
    icon: <ReportIcon />,
  },
  {
    id: 6,
    title: "Profile",
    path: "/Dashboard/Profile",
    icon: <ManageAccountsIcon />,
  },
];

export const SideBarDataDeveloper = [
  {
    id: 1,
    title: "Dashboard Home",
    path: "/Dashboard/Home",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    title: "My Projects",
    path: "/Dashboard/MyProjects",
    icon: <AssessmentIcon />,
  },
  {
    id: 3,
    title: "My Tickets",
    path: "/Dashboard/MyTickets",
    icon: <ReceiptIcon />,
  },
  {
    id: 4,
    title: "Submit Ticket",
    path: "/Dashboard/Report",
    icon: <ReportIcon />,
  },
  {
    id: 5,
    title: "Profile",
    path: "/Dashboard/Profile",
    icon: <ManageAccountsIcon />,
  },
];
