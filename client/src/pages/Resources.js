import { useEffect, useState } from "react";

import axios from "axios";

import "../styles/Resources.css";

function Resources() {

  const [resources, setResources] =
    useState([]);

  const [formData, setFormData] =
    useState({

      title: "",

      category: "",

      description: "",
    });

  const [file, setFile] =
    useState(null);

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // FETCH RESOURCES
  const fetchResources =
    async () => {

      try {

        const res =
          await axios.get(
            "http://localhost:5000/api/resources"
          );

        setResources(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  // LOAD DATA
  useEffect(() => {

    fetchResources();

  }, []);

  // UPLOAD RESOURCE
  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const data =
          new FormData();

        data.append(
          "title",
          formData.title
        );

        data.append(
          "category",
          formData.category
        );

        data.append(
          "description",
          formData.description
        );

        data.append(
          "file",
          file
        );

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.post(
          "http://localhost:5000/api/resources",
          data,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        alert(
          "Resource Uploaded"
        );

        // RESET FORM
        setFormData({

          title: "",

          category: "",

          description: "",
        });

        setFile(null);

        fetchResources();

      } catch (error) {

        console.log(error);

        alert(
          "Upload Failed"
        );
      }
    };

  // DELETE RESOURCE
  const handleDelete =
    async (id) => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        await axios.delete(
          `http://localhost:5000/api/resources/${id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        alert(
          "Resource Deleted"
        );

        fetchResources();

      } catch (error) {

        console.log(error);

        alert(
          "Delete Failed"
        );
      }
    };

  return (

    <div className="resources-page">

      {/* HEADER */}

      <div className="resources-header">

        <h1>
          Resource Sharing Hub
        </h1>

        <p>
          Upload and access quality learning resources
        </p>

      </div>

      {/* UPLOAD FORM */}

      <div className="upload-section">

        <h2>
          Upload Resource
        </h2>

        <form
          className="upload-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="title"
            placeholder="Resource Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>

          <input
            type="file"
            onChange={(e) =>
              setFile(
                e.target.files[0]
              )
            }
            required
          />

          <button type="submit">

            Upload Resource

          </button>

        </form>

      </div>

      {/* RESOURCES */}

      <div className="resources-grid">

        {resources.map(
          (resource) => (

            <div
              className="resource-card"
              key={
                resource._id
              }
            >

              <div className="resource-icon">
                📘
              </div>

              <h2>
                {resource.title}
              </h2>

              <p className="category">
                {resource.category}
              </p>

              <p className="resource-description">

                {
                  resource.description
                }

              </p>

              <div className="resource-info">

                <p>
                  👤 Uploaded By:
                  {" "}
                  {
                    resource
                      .uploadedBy
                      ?.name
                  }
                </p>

              </div>

              {/* BUTTONS */}

              <div className="resource-buttons">

                <a
                  href={`http://localhost:5000/${resource.fileUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="open-btn"
                >
                  Open
                </a>

                <a
                  href={`http://localhost:5000/${resource.fileUrl}`}
                  download
                  className="download-btn"
                >
                  Download
                </a>

              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDelete(
                    resource._id
                  )
                }
              >
                Delete
              </button>

            </div>
          )
        )}

      </div>

    </div>
  );
}

export default Resources;