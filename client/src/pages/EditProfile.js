import { useEffect, useState } from "react";

import axios from "axios";

import "../styles/EditProfile.css";

function EditProfile() {

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    department: "",
  });

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

        setFormData({
          name: res.data.name,
          bio: res.data.bio,
          department: res.data.department,
        });

      } catch (error) {

        console.log(error);
      }
    };

    fetchProfile();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated");

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="edit-profile-page">

      <form
        className="edit-profile-card"
        onSubmit={handleSubmit}
      >

        <h1>Edit Profile</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />

        <button type="submit">
          Save Changes
        </button>

      </form>

    </div>
  );
}

export default EditProfile;