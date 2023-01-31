import "./styles/app.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Protected, Public } from "./middleware/route";
import { useSelector } from "react-redux";
import Profile from "./components/Profile";
import Layout from "./pages/Layout";

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route
          path="/"
          element={
            <Public>
              <Login />
            </Public>
          }
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
          path="/home"
          element={
            <Protected>
              <Layout />
            </Protected>
          }
        />
        <Route
          path="/notifications"
          element={
            <Protected>
              <Layout />
            </Protected>
          }
        />
        <Route
          path="/users"
          element={
            <Protected>
              <Layout />
            </Protected>
          }
        />
        <Route
          path="/appointments"
          element={
            <Protected>
              <Layout />
            </Protected>
          }
        />
        <Route
          path="/doctorapply"
          element={
            <Protected>
              <Layout />
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
      </Routes>
    </Router>
  );
}

export default App;
