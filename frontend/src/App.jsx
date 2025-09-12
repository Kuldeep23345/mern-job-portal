import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/authentication/Signup";
import Login from "./pages/authentication/Login";
import Navbar from "./components/header/Navbar";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import JobDescription from "./pages/JobDescription";
import Companies from "./pages/admin/Companies";
import CreateCompany from "./pages/admin/CreateCompany";
import CompanySetup from "./pages/admin/CompanySetup";
import AdminJobs from "./pages/admin/jobs/AdminJobs";
import PostJobs from "./pages/admin/jobs/PostJobs";
import Applicants from "./pages/admin/Applicants";




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
          <Route path="/admin/companies" element={<Companies />} />
          <Route path="/admin/companies/create" element={<CreateCompany />} />
          <Route path="/admin/companies/:id" element={<CompanySetup />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/jobs/create" element={<PostJobs />} />
          <Route path="/admin/jobs/:id/applicants" element={<Applicants />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
