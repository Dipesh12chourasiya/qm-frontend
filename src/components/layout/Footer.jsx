import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-neutral-200 bg-white px-8 py-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} QuizMaster. All rights reserved.
        </p>

        <p className="text-sm text-neutral-500">
          Built with React + Vite
        </p>
      </div>
    </footer>
  );
};

export default Footer;