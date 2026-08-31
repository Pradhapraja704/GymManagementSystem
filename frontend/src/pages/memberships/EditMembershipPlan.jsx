import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import membershipService from "../../services/membershipService";

const EditMembershipPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    planName: "",
    durationMonths: "",
    price: "",
    benefits: "",
    active: true,
  });

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await membershipService.getMembershipPlanById(id);

        setFormData({
          planName: response.planName || "",
          durationMonths:
            response.durationMonths ?? "",
          price: response.price ?? "",
          benefits: response.benefits || "",
          active: response.active ?? true,
        });
      } catch (err) {
        console.error(
          "Failed to load membership plan:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load membership plan"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

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
      setSaving(true);
      setError("");

      const planData = {
        planName: formData.planName,
        durationMonths: Number(
          formData.durationMonths
        ),
        price: Number(formData.price),
        benefits: formData.benefits,
        active: formData.active,
      };

      await membershipService.updateMembershipPlan(
        id,
        planData
      );

      navigate("/memberships");
    } catch (err) {
      console.error(
        "Failed to update membership plan:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to update membership plan"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading membership plan...</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Edit Membership Plan</h1>
          <p>Update gym membership plan</p>
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
              disabled={saving}
            >
              {saving
                ? "Updating..."
                : "Update Membership Plan"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditMembershipPlan;