import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/authentication/Signup";
import Login from "./pages/authentication/Login";
import Navbar from "./components/header/Navbar";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import JobDescription from "./pages/JobDescription";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/description/:id" element={<JobDescription />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
