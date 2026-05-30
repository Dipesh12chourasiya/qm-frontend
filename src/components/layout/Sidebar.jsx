import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ links }) => {
  return (
    <aside className="w-72 bg-black text-white min-h-screen border-r border-neutral-800">
      <div className="h-16 flex items-center px-6 border-b border-neutral-800">
        <h2 className="text-xl font-bold">
          InterviewPro
        </h2>
      </div>

      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `
              flex items-center gap-3
              px-4 py-3 rounded-xl
              transition-all duration-200
              ${
                isActive
                  ? "bg-white text-black"
                  : "hover:bg-neutral-900"
              }
            `
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;