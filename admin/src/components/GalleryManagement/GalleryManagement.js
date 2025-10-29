import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GalleryManagement.css";

const GalleryManagement = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "exterior",
    imageUrl: "",
    isFeatured: false,
    displayOrder: 0,
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageType, setImageType] = useState("upload");

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const response = await axios.get("http://localhost:5000/api/gallery", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGalleryItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");
      const submitData = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== "imageUrl" || imageType === "url") {
          submitData.append(key, formData[key]);
        }
      });

      if (imageType === "upload" && imageFile) {
        submitData.append("image", imageFile);
      } else if (imageType === "url" && formData.imageUrl) {
        submitData.append("imageUrl", formData.imageUrl);
      }

      if (editingItem) {
        await axios.put(
          `http://localhost:5000/api/gallery/${editingItem._id}`,
          submitData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type":
                imageType === "upload"
                  ? "multipart/form-data"
                  : "application/json",
            },
          }
        );
      } else {
        await axios.post("http://localhost:5000/api/gallery", submitData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":
              imageType === "upload"
                ? "multipart/form-data"
                : "application/json",
          },
        });
      }

      resetForm();
      fetchGalleryItems();
    } catch (error) {
      console.error("Error saving gallery item:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "exterior",
      imageUrl: "",
      isFeatured: false,
      displayOrder: 0,
    });
    setImageFile(null);
    setImageType("upload");
    setEditingItem(null);
    setShowForm(false);
  };

  const editItem = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      imageUrl: item.imageType === "url" ? item.imageUrl : "",
      isFeatured: item.isFeatured,
      displayOrder: item.displayOrder || 0,
    });
    setImageType(item.imageType);
    setEditingItem(item);
    setShowForm(true);
  };

  const deleteItem = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.delete(`http://localhost:5000/api/gallery/${itemId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchGalleryItems();
      } catch (error) {
        console.error("Error deleting gallery item:", error);
      }
    }
  };

  const getImageUrl = (item) => {
    if (item.imageType === "upload") {
      return `http://localhost:5000${item.imageUrl}`;
    }
    return item.imageUrl;
  };

  if (loading) return <div className="loading">Loading gallery...</div>;

  return (
    <div className="gallery-management">
      <div className="page-header">
        <h1>Gallery Management</h1>
        <p>Manage and organize your portfolio gallery</p>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          + Add New Image
        </button>
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>{editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}</h2>
              <button className="close-btn" onClick={resetForm}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="form-content">
              <div className="form-grid">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="exterior">Exterior</option>
                    <option value="interior">Interior</option>
                    <option value="ceramic">Ceramic Coating</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Display Order</label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="isFeatured"
                      checked={formData.isFeatured}
                      onChange={handleInputChange}
                    />
                    Featured Item
                  </label>
                </div>

                <div className="form-group full-width">
                  <label>Image Source</label>
                  <div className="image-source-toggle">
                    <button
                      type="button"
                      className={`toggle-btn1 ${imageType === "upload" ? "active" : ""}`}
                      onClick={() => setImageType("upload")}
                    >
                      Upload File
                    </button>
                    <button
                      type="button"
                      className={`toggle-btn1 ${imageType === "url" ? "active" : ""}`}
                      onClick={() => setImageType("url")}
                    >
                      URL Link
                    </button>
                  </div>
                </div>

                {imageType === "upload" ? (
                  <div className="form-group full-width">
                    <label>Upload Image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      required={!editingItem}
                    />
                    {editingItem && (
                      <div className="preview-wrapper">
                        <p>Current Image:</p>
                        <img
                          src={getImageUrl(editingItem)}
                          alt="preview"
                          className="preview-img"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="form-group full-width">
                    <label>Image URL *</label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                  </div>
                )}

                <div className="form-group full-width">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Enter description..."
                  />
                </div>
              </div>

              <div className="form-actions3">
                <button type="button" className="btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingItem ? "Update Item" : "Add Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {galleryItems.map((item) => (
          <div key={item._id} className="gallery-card">
            <img src={getImageUrl(item)} alt={item.title} className="gallery-img" />
            <div className="gallery-info">
              <div className="info-top">
                <span className="category">{item.category}</span>
                {item.isFeatured && <span className="featured">★ Featured</span>}
              </div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <div className="card-actions">
                <button className="btn-sm btn-secondary" onClick={() => editItem(item)}>
                  Edit
                </button>
                <button className="btn-sm btn-danger" onClick={() => deleteItem(item._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {galleryItems.length === 0 && (
        <div className="empty-state">
          <h3>No Gallery Items</h3>
          <p>Start by adding your first image.</p>
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            Add Image
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryManagement;
