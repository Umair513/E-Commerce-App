import logo from "./logo.svg";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Header from "./components/Layout/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route path="/policy" element={<Policy></Policy>}></Route>
        <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/dashboard" element={<PrivateRoute></PrivateRoute>}>
          <Route path="" element={<Dashboard></Dashboard>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
