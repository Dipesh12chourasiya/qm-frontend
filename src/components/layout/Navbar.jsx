// import React from "react";

// const Navbar = ({ title = "Dashboard", user }) => {
//   return (
//     <header className="h-16 bg-white border-b border-neutral-200 px-8 flex items-center justify-between">
//       <div>
//         <h1 className="text-xl font-semibold text-black">
//           {title}
//         </h1>
//       </div>

//       <div className="flex items-center gap-4">
//         <button className="relative">
//           <span className="text-xl">🔔</span>

//           <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-black" />
//         </button>

//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold">
//             {user?.name?.charAt(0)?.toUpperCase() || "U"}
//           </div>

//           <div>
//             <p className="font-medium text-sm">
//               {user?.name || "User"}
//             </p>

//             <p className="text-xs text-neutral-500">
//               {user?.role || "Member"}
//             </p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;


import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-16 px-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold"
        >
          InterviewPro
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/login"
            className="text-neutral-600 hover:text-black"
          >
            Login
          </Link>

          <Link to="/register">
            <button className="bg-black text-white px-5 py-2 rounded-xl">
              Register
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;