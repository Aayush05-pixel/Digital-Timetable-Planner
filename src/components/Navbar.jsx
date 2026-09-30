import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <h1>Timetable Planner</h1>
      <nav>
        <NavLink to="/" end>Weekly view</NavLink>
        <NavLink to="/manage">Manage classes</NavLink>
        <NavLink to="/add">Add class</NavLink>
      </nav>
    </header>
  );
}
