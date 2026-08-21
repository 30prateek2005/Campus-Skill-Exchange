import { useEffect, useState } from "react";

import axios from "axios";

import "../styles/Dashboard.css";

function Dashboard() {
  const [user, setUser] =
  useState(null);

useEffect(() => {

  const fetchUser =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await axios.get(
            "http://localhost:5000/api/users/profile",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setUser(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  fetchUser();

}, []);
const [stats, setStats] = useState(null);
useEffect(() => {

  const fetchDashboard = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  fetchDashboard();

}, []);
if (!stats) {

  return (

    <div className="dashboard-page">

      <h1>
        Dashboard
      </h1>

      <p>
        Unable to load dashboard data
      </p>

    </div>
  );
}
  return (

    <div className="dashboard-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <h1>Welcome Back, {user?.name}  👋</h1>

        <p>
          Track your learning progress and mentorship activities
        </p>

      </div>

      {/* STATS */}

      <div className="dashboard-stats">

        <div className="dashboard-card">

          <h2>{stats.totalSkills}</h2>

          <p>Total Skills</p>

        </div>

        <div className="dashboard-card">

          <h2>{stats.requestsSent}</h2>

          <p>Requests Sent</p>

        </div>

        <div className="dashboard-card">

          <h2>{stats.requestsReceived}</h2>

          <p>Requests Received</p>

        </div>

        <div className="dashboard-card">

          <h2>{stats.resourcesUploaded}</h2>

          <p>Resources Uploaded</p>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="dashboard-content">

        {/* LEFT SECTION */}

        <div className="dashboard-left">

          {/* PROGRESS */}

          <div className="progress-card">

            <h3>Profile Completion</h3>

            <div className="progress-bar">

              <div className="progress-fill"></div>

            </div>

            <p>80% Completed</p>

          </div>

          {/* RECENT ACTIVITY */}

          <div className="activity-card">

            <h3>Recent Activity</h3>

            <ul>

              <li>✅ Uploaded React Notes</li>

              <li>✅ Accepted mentorship request</li>

              <li>✅ Added MongoDB skill</li>

              <li>✅ Updated profile details</li>

            </ul>

          </div>

        </div>

        {/* RIGHT SECTION */}

        <div className="dashboard-right">

          {/* UPCOMING */}

          <div className="upcoming-card">

            <h3>Upcoming Mentorship</h3>

            <p>
              React Mentorship Session
            </p>

            <span>
              Tomorrow • 7:00 PM
            </span>

          </div>

          {/* NOTIFICATIONS */}

          <div className="notification-card">

            <h3>Notifications</h3>

            <ul>

              <li>🔔 New mentorship request</li>

              <li>🔔 Resource upload successful</li>

              <li>🔔 Your profile got 5 views</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;