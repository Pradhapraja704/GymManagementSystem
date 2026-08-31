import { useEffect, useState } from "react";
import api from "../services/api";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/dashboard/summary");
        setSummary(response.data);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div className="dashboard-page">Loading Dashboard...</div>;
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of your gym management system</p>
        </div>
      </div>

      {summary && (
        <div className="dashboard-cards">
          <div className="stat-card">
            <h3>Total Members</h3>
            <strong>{summary.totalMembers}</strong>
          </div>

          <div className="stat-card">
            <h3>Total Trainers</h3>
            <strong>{summary.totalTrainers}</strong>
          </div>

          <div className="stat-card">
            <h3>Total Attendance</h3>
            <strong>{summary.totalAttendance}</strong>
          </div>

          <div className="stat-card">
            <h3>Active Members</h3>
            <strong>{summary.activeMembers}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;