import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import axios from "axios";

import "../styles/Profile.css";

function Profile() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchProfile();

  }, []);

  if (!user) {

  return (

    <div className="profile-page">

      <h1>
        Profile
      </h1>

      <p>
        Unable to load profile
      </p>

    </div>
  );
}

  return (

    <div className="profile-page">

      {/* PROFILE TOP */}

      <div className="profile-top">

        {/* LEFT */}

        <div className="profile-card">

          <div className="profile-avatar">

            {user.name.charAt(0).toUpperCase()}

          </div>

          <h1>{user.name}</h1>

          <p className="profile-role">

            {user.bio}

          </p>

          <p className="profile-email">

            {user.email}

          </p>

          <p className="profile-bio">

            Department: {user.department}

          </p>

          <button
            className="edit-btn"
            onClick={() =>
              navigate("/edit-profile")
            }
          >
            Edit Profile
          </button>

        </div>

        {/* RIGHT */}

        <div className="profile-stats">

          <div className="stat-box">

            <h2>15</h2>

            <p>Projects</p>

          </div>

          <div className="stat-box">

            <h2>50+</h2>

            <p>Mentorship Sessions</p>

          </div>

          <div className="stat-box">

            <h2>4.9</h2>

            <p>Rating</p>

          </div>

          <div className="stat-box">

            <h2>120</h2>

            <p>Connections</p>

          </div>

        </div>

      </div>

      {/* SKILLS */}

      <div className="skills-card">

        <h2>Skills</h2>

        <div className="skills-container">

          {user.skills.map((skill, index) => (

            <span key={index}>

              {skill}

            </span>

          ))}

        </div>

      </div>

      {/* ACHIEVEMENTS */}

      <div className="achievement-card">

        <h2>Achievements</h2>

        <ul>

          <li>🏆 Top MERN Mentor</li>

          <li>🏆 100+ DSA Problems Solved</li>

          <li>🏆 Best Project Contributor</li>

          <li>🏆 React Specialist Badge</li>

        </ul>

      </div>

      {/* RECENT ACTIVITY */}

      <div className="activity-section">

        <h2>Recent Activity</h2>

        <div className="activity-item">

          ✅ Uploaded React Interview Notes

        </div>

        <div className="activity-item">

          ✅ Accepted mentorship request

        </div>

        <div className="activity-item">

          ✅ Added Node.js skill

        </div>

      </div>

      {/* SOCIAL LINKS */}

      <div className="social-card">

        <h2>Social Links</h2>

        <div className="social-links">

          <a
            href={user.socialLinks?.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href={user.socialLinks?.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>

        </div>

      </div>

    </div>
  );
}

export default Profile;