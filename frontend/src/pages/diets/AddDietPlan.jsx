import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dietService from "../../services/dietService";
import memberService from "../../services/memberService";

const AddDietPlan = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
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
    createdDate: new Date().toISOString().split("T")[0],
    active: true,
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await memberService.getAllMembers();

        setMembers(
          Array.isArray(response) ? response : []
        );
      } catch (err) {
        console.error("Failed to load members:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load members"
        );
      } finally {
        setLoadingMembers(false);
      }
    };

    fetchMembers();
  }, []);

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

      await dietService.addDietPlan(dietData);

      navigate("/diets");
    } catch (err) {
      console.error("Failed to add diet plan:", err);

      setError(
        err.response?.data?.message ||
          "Failed to add diet plan"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Add Diet Plan</h1>
          <p>Create a new member diet plan</p>
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
              disabled={loadingMembers}
            >
              <option value="">
                {loadingMembers
                  ? "Loading members..."
                  : "Select Member"}
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
              placeholder="Enter breakfast"
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
              placeholder="Enter lunch"
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
              placeholder="Enter dinner"
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
              placeholder="Enter snacks"
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
              placeholder="Enter daily calories"
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
              placeholder="Enter notes"
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
                ? "Saving..."
                : "Add Diet Plan"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddDietPlan;