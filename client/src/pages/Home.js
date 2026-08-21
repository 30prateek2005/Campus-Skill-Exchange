import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero-section">

        <div className="hero-content">

          <h1>
            Learn, Teach & Grow Together
          </h1>

          <p>
            Connect with skilled students,
            mentors and developers across campus.
          </p>

          <div className="hero-buttons">

            <button>
              Explore Skills
            </button>

            <button className="secondary-btn">
              Find Mentors
            </button>

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="features-section">

        <h2>
          Why Choose Campus Skill Exchange?
        </h2>

        <div className="features-grid">

          <div className="feature-card">
            <h3>🎯 Skill Sharing</h3>

            <p>
              Learn React, DSA, AI, Web Development,
              and more from peers.
            </p>
          </div>

          <div className="feature-card">
            <h3>🤝 Mentorship</h3>

            <p>
              Connect with experienced students
              and mentors.
            </p>
          </div>

          <div className="feature-card">
            <h3>📚 Resource Hub</h3>

            <p>
              Upload and access notes,
              projects and study material.
            </p>
          </div>

        </div>

      </section>

      {/* POPULAR SKILLS */}

      <section className="skills-section">

        <h2>Popular Skills</h2>

        <div className="skills-container">

          <span>React</span>
          <span>Node.js</span>
          <span>MongoDB</span>
          <span>DSA</span>
          <span>Machine Learning</span>
          <span>Java</span>
          <span>Python</span>
          <span>UI/UX</span>

        </div>

      </section>

      {/* TOP MENTORS */}

      <section className="mentor-section">

        <h2>Top Mentors</h2>

        <div className="mentor-grid">

          <div className="mentor-card">
            <div className="mentor-avatar">P</div>

            <h3>Prateek Khandelwal</h3>

            <p>MERN Stack Developer</p>

            <button>View Profile</button>
          </div>

          <div className="mentor-card">
            <div className="mentor-avatar">H</div>

            <h3>Harsh Sharma</h3>

            <p>DSA Expert</p>

            <button>View Profile</button>
          </div>

          <div className="mentor-card">
            <div className="mentor-avatar">A</div>

            <h3>Aman Verma</h3>

            <p>AI & ML Mentor</p>

            <button>View Profile</button>
          </div>

        </div>

      </section>

      {/* STATS */}

      <section className="stats-section">

        <div className="stat-card">
          <h1>500+</h1>
          <p>Students</p>
        </div>

        <div className="stat-card">
          <h1>120+</h1>
          <p>Mentors</p>
        </div>

        <div className="stat-card">
          <h1>1000+</h1>
          <p>Resources Shared</p>
        </div>

        <div className="stat-card">
          <h1>300+</h1>
          <p>Projects Built</p>
        </div>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <h2>
          Start Your Learning Journey Today
        </h2>

        <p>
          Join the campus community and
          grow your skills faster.
        </p>

        <button>
          Join Now
        </button>

      </section>

    </div>
  );
}

export default Home;