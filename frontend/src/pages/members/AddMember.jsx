import { useState } from "react";
import { useNavigate } from "react-router-dom";
import memberService from "../../services/memberService";

const AddMember = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    joinDate: "",
    membershipExpiryDate: "",
    membershipType: "",
    height: "",
    weight: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    active: true,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await memberService.addMember(formData);

      navigate("/members");
    } catch (err) {
      console.error("Failed to add member:", err);

      setError(
        err.response?.data?.message ||
        "Failed to add member"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Add Member</h1>
          <p>Add a new gym member</p>
        </div>
      </div>

      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-row">

            <div className="form-group">
              <label>First Name</label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                required
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>

              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Gender</label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>

              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Address</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows="3"
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Join Date</label>

              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Membership Expiry Date</label>

              <input
                type="date"
                name="membershipExpiryDate"
                value={formData.membershipExpiryDate}
                onChange={handleChange}
              />
            </div>

          </div>

          <div className="form-group">
            <label>Membership Type</label>

            <select
              name="membershipType"
              value={formData.membershipType}
              onChange={handleChange}
            >
              <option value="">Select Membership Type</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Half-Yearly">Half-Yearly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Height (cm)</label>

              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Enter height"
                step="0.1"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Weight (kg)</label>

              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Enter weight"
                step="0.1"
                min="0"
              />
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Emergency Contact Name</label>

              <input
                type="text"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                placeholder="Enter emergency contact name"
              />
            </div>

            <div className="form-group">
              <label>Emergency Contact Phone</label>

              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
                placeholder="Enter emergency contact phone"
              />
            </div>

          </div>

          <div className="form-group checkbox-group">

            <label>
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleChange}
              />

              Active Member
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
              onClick={() => navigate("/members")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Member"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddMember;