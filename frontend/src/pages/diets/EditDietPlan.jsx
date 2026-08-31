import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dietService from "../../services/dietService";
import memberService from "../../services/memberService";

const EditDietPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    memberId: "",
    breakfast: "",
    lunch: "",
    dinner: "",
    snacks: "",
    calories: "",
    notes: "",
    createdDate: "",
    active: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [dietResponse, memberResponse] =
          await Promise.all([
            dietService.getDietPlanById(id),
            memberService.getAllMembers(),
          ]);

        setMembers(
          Array.isArray(memberResponse)
            ? memberResponse
            : []
        );

        setFormData({
          memberId: dietResponse.memberId ?? "",
          breakfast: dietResponse.breakfast || "",
          lunch: dietResponse.lunch || "",
          dinner: dietResponse.dinner || "",
          snacks: dietResponse.snacks || "",
          calories: dietResponse.calories ?? "",
          notes: dietResponse.notes || "",
          createdDate: dietResponse.createdDate || "",
          active: dietResponse.active ?? true,
        });
      } catch (err) {
        console.error(
          "Failed to load diet plan:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Failed to load diet plan"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

      const dietData = {
        memberId: Number(formData.memberId),
        breakfast: formData.breakfast,
        lunch: formData.lunch,
        dinner: formData.dinner,
        snacks: formData.snacks,
        calories: Number(formData.calories),
        notes: formData.notes,
        createdDate: formData.createdDate,
        active: formData.active,
      };

      await dietService.updateDietPlan(id, dietData);

      navigate("/diets");
    } catch (err) {
      console.error(
        "Failed to update diet plan:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to update diet plan"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <p>Loading diet plan...</p>
      </div>
    );
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Edit Diet Plan</h1>
          <p>Update member diet plan</p>
        </div>
      </div>

      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Member</label>

            <select
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Member
              </option>

              {members.map((member) => (
                <option
                  key={member.memberId}
                  value={member.memberId}
                >
                  {member.firstName}{" "}
                  {member.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Breakfast</label>

            <textarea
              name="breakfast"
              value={formData.breakfast}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Lunch</label>

            <textarea
              name="lunch"
              value={formData.lunch}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Dinner</label>

            <textarea
              name="dinner"
              value={formData.dinner}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Snacks</label>

            <textarea
              name="snacks"
              value={formData.snacks}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Calories</label>

            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Notes</label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Created Date</label>

            <input
              type="date"
              name="createdDate"
              value={formData.createdDate}
              onChange={handleChange}
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
              onClick={() => navigate("/diets")}
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
                : "Update Diet Plan"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default EditDietPlan;