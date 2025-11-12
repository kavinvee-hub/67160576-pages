import { NavLink } from "react-router-dom";

export default function Navbar({ setIsLoggedIn, totalProducts = 0 }) {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" className="nav-item">Home</NavLink>
        <NavLink to="/calculator" className="nav-item">Calculator</NavLink>
        <NavLink to="/animation" className="nav-item">Animation</NavLink>
        <NavLink to="/component" className="nav-item">Component</NavLink>
        <NavLink to="/todos" className="nav-item">Todos</NavLink>


        <NavLink to="/prodouts" className="nav-item">
          Products ({totalProducts})
        </NavLink>

        <NavLink to="/carts" className="nav-item">Carts</NavLink>
      </div>

      <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
        Logout
      </button>
    </nav>
  );
}
