import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <>
      <Navbar />

      <main className="bg-neutral-50 min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default PublicLayout;