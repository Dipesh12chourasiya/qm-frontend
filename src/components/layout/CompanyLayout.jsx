import React from "react";
import { Outlet } from "react-router-dom";
import {
  FiHome,
  FiBarChart2,
  FiBook,
  FiFileText,
} from "react-icons/fi";

import { FaRegNoteSticky } from "react-icons/fa6";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";



const CompanyLayout = () => {
  const links = [
    {
      label: "Dashboard",
      path: "/company/dashboard",
      icon: <FiHome />,
    },
    {
      label: "Question Bank",
      path: "/company/questions",
      icon: <FiBook />,
    },
    {
      label: "Create Test",
      path: "/company/create-test",
      icon: <FiFileText />,
    },
    {
      label: "My Tests",
      path: "/company/tests",
      icon:  <FaRegNoteSticky />,
    },
    {
      label: "Analytics",
      path: "/company/analytics",
      icon: <FiBarChart2 />,
    },
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />

      <div className="flex flex-col flex-1 min-h-screen">
        <Navbar title="Company Portal" />

        <main className="flex-1 bg-neutral-50 p-8">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default CompanyLayout;