import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Topbar from './components/common/Topbar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Sections from './pages/Sections';
import Admissions from './pages/Admissions';
import Examinations from './pages/Examinations';
import Results from './pages/Results';
import Staff from './pages/Staff';
import Facilities from './pages/Facilities';
import Notices from './pages/Notices';
import Gallery from './pages/Gallery';
import StudentCorner from './pages/StudentCorner';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Downloads from './pages/Downloads';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Login from './pages/dashboard/Login';
import DashboardLayout from './pages/dashboard/DashboardLayout';

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Topbar />
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* Public Pages Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sections" element={<Sections />} />
        <Route path="/sections/:sectionId" element={<Sections />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/examinations" element={<Examinations />} />
        <Route path="/results" element={<Results />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/student-corner" element={<StudentCorner />} />
        <Route path="/government-schemes" element={<GovernmentSchemes />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Protected Dashboard Layout */}
      <Route path="/dashboard/*" element={<DashboardLayout />} />
    </Routes>
  );
}
