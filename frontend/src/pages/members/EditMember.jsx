import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import memberService from "../../services/memberService";

const EditMember = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await memberService.getMemberById(id);

        setFormData({
          firstName: response.firstName || "",
          lastName: response.lastName || "",
          email: response.email || "",
          phoneNumber: response.phoneNumber || "",
          gender: response.gender || "",
          dateOfBirth: response.dateOfBirth || "",
          address: response.address || "",
          joinDate: response.joinDate || "",
          membershipExpiryDate: response.membershipExpiryDate || "",
          membershipType: response.membershipType || "",
          height: response.height ?? "",
          weight: response.weight ?? "",
          emergencyContactName: response.emergencyContactName || "",
          emergencyContactPhone: response.emergencyContactPhone || "",
          active: response.active ?? true,
        });
      } catch (err) {
        console.error("Failed to load member:", err);

        setError(
          err.response?.data?.message || "Failed to load member"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
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
      await memberService.updateMember(id, formData);

      navigate("/members");
    } catch (err) {
      console.error("Failed to update member:", err);

      setError(
        err.response?.data?.message || "Failed to update member"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading member...</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Edit Member</h1>
          <p>Update member information</p>
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
              />
            </div>

            <div className="form-group">
              <label>Emergency Contact Phone</label>

              <input
                type="tel"
                name="emergencyContactPhone"
                value={formData.emergencyContactPhone}
                onChange={handleChange}
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
              disabled={saving}
            >
              {saving ? "Updating..." : "Update Member"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditMember;