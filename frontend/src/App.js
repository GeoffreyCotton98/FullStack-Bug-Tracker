import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HomeDash from "./components/DashBoardCom.jsx/HomeDashCom/HomeDash";
import MyTicketsDashDisplay from "./components/DashBoardCom.jsx/MyTicketsDashCom/MyTicketDashDisplay";
import MyTicketDisplay from "./components/DashBoardCom.jsx/MyTicketsDashCom/MyTicketDisplay";
import AssignedTicketDisplay from "./components/DashBoardCom.jsx/MyTicketsDashCom/AssignedTicketDisplay";
import RoleDash from "./components/DashBoardCom.jsx/RoleDashCom/RoleDash";
import TicketDash from "./components/DashBoardCom.jsx/TicketDashCom/TicketDash";
import TicketForm from "./components/DashBoardCom.jsx/TicketForm";
import SingleTicketDisplay from "./components/SingleTicketDisplay";
import CreateProjectForm from "./components/DashBoardCom.jsx/CreateProjectsDashCom/CreateProjectForm";
import AllProjectDash from "./components/DashBoardCom.jsx/AllProjectsDash/AllProjectsDash";
import SingleProjectDisplay from "./components/DashBoardCom.jsx/AllProjectsDash/SingleProjectDisplay";
import MyProjectsDash from "./components/DashBoardCom.jsx/MyProjectsDashCom/MyProjectsDash";
import SingleMyProject from "./components/DashBoardCom.jsx/MyProjectsDashCom/SingleMyProject";

import ProjectManageDash from "./components/DashBoardCom.jsx/ProjectManageDashCom/ProjectManageDash";
import ProjectManageDisplay from "./components/DashBoardCom.jsx/ProjectManageDashCom/ProjectManageDisplay";
import TicketProject from "./components/DashBoardCom.jsx/ProjectManageDashCom/TicketProject";
import Profile from "./components/DashBoardCom.jsx/Profile";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />

          <Route exact path="/Register" element={<Register />} />

          <Route exact path="/Dashboard/*" element={<Dashboard />}>
            <Route exact path="Home" element={<HomeDash />} />

            <Route exact path="CreateProject" element={<CreateProjectForm />} />

            <Route exact path="Projects/*" element={<AllProjectDash />}>
              <Route path="Project/:id" element={<SingleProjectDisplay />} />
            </Route>

            <Route exact path="MyProjects/*" element={<MyProjectsDash />}>
              <Route path="MyProject/:id" element={<SingleMyProject />} />
            </Route>

            <Route exact path="RoleManage" element={<RoleDash />}>
              <Route path="User/:id" element={<SingleTicketDisplay />} />
            </Route>

            <Route exact path="ProjectManage/*" element={<ProjectManageDash />}>
              <Route path="Project/:id" element={<ProjectManageDisplay />} />
              <Route path="Ticket/:id" element={<TicketProject />} />
            </Route>

            <Route exact path="MyTickets/*" element={<MyTicketsDashDisplay />}>
              <Route path="MyTicket/:id" element={<MyTicketDisplay />} />

              <Route
                path="AssignedTicket/:id"
                element={<AssignedTicketDisplay />}
              />
            </Route>

            <Route exact path="Tickets/*" element={<TicketDash />}>
              <Route path="Ticket/:id" element={<SingleTicketDisplay />} />
            </Route>

            <Route exact path="Report" element={<TicketForm />} />

            <Route exact path="Profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
