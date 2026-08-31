import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>GYM</h2>
        <span>Management</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/members">Members</NavLink>
        <NavLink to="/trainers">Trainers</NavLink>
        <NavLink to="/attendance">Attendance</NavLink>
        <NavLink to="/assignments">Trainer Assignment</NavLink>
        <NavLink to="/workouts">Workout Plans</NavLink>
        <NavLink to="/memberships">Membership Plans</NavLink>
        <NavLink to="/diets">Diet Plans</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;