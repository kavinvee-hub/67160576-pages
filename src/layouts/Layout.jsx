import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/MainLayout.css";

export default function Layout({ setIsLoggedIn, totalProducts }) {
  return (
    <div className="layout-container">
      <Header />
      <Navbar setIsLoggedIn={setIsLoggedIn} totalProducts={totalProducts} />
      <main className="outlet">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
