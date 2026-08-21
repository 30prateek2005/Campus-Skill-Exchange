import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Requests.css";

function Requests() {

  const [requests, setRequests] =
    useState([]);

  const [formData, setFormData] =
    useState({
      senderName: "",
      senderEmail: "",
      skill: "",
      message: "",
    });

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };

  // FETCH REQUESTS
  const fetchRequests = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res =
        await axios.get(
          "http://localhost:5000/api/requests",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setRequests(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  // LOAD REQUESTS
  useEffect(() => {

    fetchRequests();

  }, []);

  // SEND REQUEST
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(

        "http://localhost:5000/api/requests",

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert("Request Sent");

      setFormData({

        senderName: "",

        senderEmail: "",

        skill: "",

        message: "",
      });

      fetchRequests();

    } catch (error) {

      console.log(error);

      alert("Failed");

    }
  };

  // UPDATE STATUS
  const updateStatus = async (
    id,
    status
  ) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(

        `http://localhost:5000/api/requests/${id}`,

        { status },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      setRequests(

        requests.map((req) =>

          req._id === id

            ? {
                ...req,
                status,
              }

            : req
        )
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to update request"
      );

    }
  };

  return (

    <div className="requests-page">

      {/* HEADER */}

      <div className="requests-header">

        <h1>
          Mentorship Requests
        </h1>

        <p>
          Connect with mentors and learners
        </p>

      </div>

      {/* FORM */}

      <div className="request-form-section">

        <h2>
          Send Request
        </h2>

        <form
          className="request-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="senderName"
            placeholder="Your Name"
            value={
              formData.senderName
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="email"
            name="senderEmail"
            placeholder="Your Email"
            value={
              formData.senderEmail
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="text"
            name="skill"
            placeholder="Skill Needed"
            value={
              formData.skill
            }
            onChange={
              handleChange
            }
            required
          />

          <textarea
            name="message"
            placeholder="Write your message"
            value={
              formData.message
            }
            onChange={
              handleChange
            }
            required
          ></textarea>

          <button
            type="submit"
          >
            Send Request
          </button>

        </form>

      </div>

      {/* REQUEST LIST */}

      <div className="requests-grid">

        {requests.map(
          (request) => (

            <div
              className="request-card"
              key={
                request._id
              }
            >

              <h2>
                {
                  request.senderName
                }
              </h2>

              <p>
                📧{" "}
                {
                  request.senderEmail
                }
              </p>

              <p>
                💡 Skill:{" "}
                {
                  request.skill
                }
              </p>

              <p>
                📝{" "}
                {
                  request.message
                }
              </p>

              <p>

                Status:{" "}

                <span>

                  {
                    request.status
                  }

                </span>

              </p>

              <div className="request-buttons">

                <button
                  className="accept-btn"
                  onClick={() =>
                    updateStatus(
                      request._id,
                      "Accepted"
                    )
                  }
                >
                  Accept
                </button>

                <button
                  className="reject-btn"
                  onClick={() =>
                    updateStatus(
                      request._id,
                      "Rejected"
                    )
                  }
                >
                  Reject
                </button>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default Requests;