import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Protected, Public, Admin } from "./middleware/route";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Error from "./pages/Error";
import Notifications from "./pages/Notifications";
import ApplyDoctor from "./pages/ApplyDoctor";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={
            <Public>
              <Register />
            </Public>
          }
        />
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/doctors"
          element={<Doctors />}
        />
        <Route
          path="/appointments"
          element={
            <Protected>
              <Appointments />
            </Protected>
          }
        />
        <Route
          path="/notifications"
          element={
            <Protected>
              <Notifications />
            </Protected>
          }
        />
        <Route
          path="/applyfordoctor"
          element={
            <Protected>
              <ApplyDoctor />
            </Protected>
          }
        />
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <Admin>
              <Dashboard type={"users"} />
            </Admin>
          }
        />
        <Route
          path="/dashboard/doctors"
          element={
            <Admin>
              <Dashboard type={"doctors"} />
            </Admin>
          }
        />
        <Route
          path="/dashboard/appointments"
          element={
            <Protected>
              <Dashboard type={"appointments"} />
            </Protected>
          }
        />
        <Route
          path="/dashboard/applications"
          element={
            <Protected>
              <Dashboard type={"applications"} />
            </Protected>
          }
        />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </Router>
  );
}

export default App;
