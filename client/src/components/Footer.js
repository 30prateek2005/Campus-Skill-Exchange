import "../styles/Footer.css";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-content">

        {/* LEFT */}

        <div className="footer-section">

          <h2>Campus Skill Exchange</h2>

          <p>
            Learn, Teach and Grow Together through collaboration and mentorship.
          </p>

        </div>

        {/* CENTER */}

        <div className="footer-section">

          <h3>Quick Links</h3>

          <a href="/home">Home</a>

          <a href="/search">Search</a>

          <a href="/resources">Resources</a>

          <a href="/dashboard">Dashboard</a>

        </div>

        {/* RIGHT */}

        <div className="footer-section">

          <h3>Contact</h3>

          <p>Email: support@campusskills.com</p>

          <p>Phone: +91 9876543210</p>

        </div>

      </div>

      {/* BOTTOM */}

      <div className="footer-bottom">

        © 2026 Campus Skill Exchange Platform.
        All Rights Reserved.

      </div>

    </footer>
  );
}

export default Footer;