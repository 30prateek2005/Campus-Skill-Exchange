import { useEffect, useState } from "react";

import axios from "axios";

import "../styles/SearchUsers.css";

function Search() {

  const [search, setSearch] =
    useState("");

  const [users, setUsers] =
    useState([]);

  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const res = await axios.get(

        `http://localhost:5000/api/users/search?search=${search}`

      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchUsers();

  }, [search]);

  return (

    <div className="search-page">

      {/* HEADER */}

      <div className="search-header">

        <h1>
          Search Users
        </h1>

        <p>
          Find mentors and learners
        </p>

      </div>

      {/* SEARCH INPUT */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* USERS */}

      <div className="users-grid">

        {users.map((user) => (

          <div
            className="user-card"
            key={user._id}
          >

            <div className="user-avatar">

              {user.name
                .charAt(0)
                .toUpperCase()}

            </div>

            <h2>
              {user.name}
            </h2>

            <p>
              {user.email}
            </p>

            <p>
              {user.bio}
            </p>

            <div className="skills-container">

              {user.skills?.map(
                (skill, index) => (

                  <span key={index}>
                    {skill}
                  </span>

                )
              )}

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Search;