import { useState } from "react";
import { useNavigate } from "react-router-dom";
import membershipService from "../../services/membershipService";

const AddMembershipPlan = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    planName: "",
    durationMonths: "",
    price: "",
    benefits: "",
    active: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const planData = {
        planName: formData.planName,
        durationMonths: Number(formData.durationMonths),
        price: Number(formData.price),
        benefits: formData.benefits,
        active: formData.active,
      };

      await membershipService.addMembershipPlan(
        planData
      );

      navigate("/memberships");
    } catch (err) {
      console.error(
        "Failed to add membership plan:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to add membership plan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Add Membership Plan</h1>
          <p>Create a new gym membership plan</p>
        </div>
      </div>

      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Plan Name</label>

            <input
              type="text"
              name="planName"
              value={formData.planName}
              onChange={handleChange}
              placeholder="Enter plan name"
              required
            />
          </div>

          <div className="form-group">
            <label>Duration (Months)</label>

            <input
              type="number"
              name="durationMonths"
              value={formData.durationMonths}
              onChange={handleChange}
              placeholder="Enter duration in months"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label>Benefits</label>

            <textarea
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              placeholder="Enter membership benefits"
              rows="5"
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

              Active Plan
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
              onClick={() =>
                navigate("/memberships")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Add Membership Plan"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddMembershipPlan;