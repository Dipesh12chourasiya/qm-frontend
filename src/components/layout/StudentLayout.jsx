import React from "react";
import { Outlet } from "react-router-dom";
import {
  FiHome,
  FiBarChart2,
  FiBook,
  FiFileText,
} from "react-icons/fi";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const StudentLayout = () => {
  const links = [
    {
      label: "Dashboard",
      path: "/student/dashboard",
      icon: <FiHome />,
    },
    {
      label: "Available Tests",
      path: "/student/tests",
      icon: <FiFileText />,
    },
    {
      label: "My Attempts",
      path: "/student/attempts",
      icon: <FiBarChart2 />,
    },
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />

      <div className="flex flex-col flex-1 min-h-screen">
        <Navbar title="Student Portal" />

        <main className="flex-1 p-8 bg-neutral-50">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default StudentLayout;