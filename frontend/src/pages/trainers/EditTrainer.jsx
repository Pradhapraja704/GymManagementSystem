import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import trainerService from "../../services/trainerService";

const EditTrainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    specialization: "",
    experienceYears: "",
    salary: "",
    joiningDate: "",
    gender: "",
    address: "",
    active: true,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await trainerService.getTrainerById(id);

        setFormData({
          fullName: response.fullName || "",
          email: response.email || "",
          phoneNumber: response.phoneNumber || "",
          specialization: response.specialization || "",
          experienceYears: response.experienceYears ?? "",
          salary: response.salary ?? "",
          joiningDate: response.joiningDate || "",
          gender: response.gender || "",
          address: response.address || "",
          active: response.active ?? true,
        });
      } catch (err) {
        console.error("Failed to load trainer:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load trainer"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSaving(true);

    try {
      await trainerService.updateTrainer(id, {
        ...formData,
        experienceYears: Number(formData.experienceYears),
        salary: Number(formData.salary),
      });

      navigate("/trainers");
    } catch (err) {
      console.error("Failed to update trainer:", err);

      setError(
        err.response?.data?.message ||
          "Failed to update trainer"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading trainer...</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Edit Trainer</h1>
          <p>Update trainer information</p>
        </div>
      </div>

      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

          </div>

          <div className="form-group">
            <label>Specialization</label>

            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >
              <option value="">Select Specialization</option>
              <option value="Strength Training">
                Strength Training
              </option>
              <option value="Weight Loss">
                Weight Loss
              </option>
              <option value="Bodybuilding">
                Bodybuilding
              </option>
              <option value="Cardio">Cardio</option>
              <option value="Yoga">Yoga</option>
              <option value="CrossFit">CrossFit</option>
              <option value="Personal Training">
                Personal Training
              </option>
            </select>
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Experience (Years)</label>

              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label>Salary</label>

              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>

          </div>

          <div className="form-group">
            <label>Joining Date</label>

            <input
              type="date"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group checkbox-group">

            <label>
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />

              Active Trainer
            </label>

          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/trainers")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Trainer"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditTrainer;