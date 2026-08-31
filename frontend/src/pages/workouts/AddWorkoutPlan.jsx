import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import workoutService from "../../services/workoutService";
import memberService from "../../services/memberService";

const AddWorkoutPlan = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    memberId: "",
    planName: "",
    goal: "",
    durationWeeks: "",
    description: "",
    createdDate: new Date().toISOString().split("T")[0],
    active: true,
  });

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoadingMembers(true);

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

    setError("");
    setLoading(true);

    try {
      const workoutData = {
        memberId: Number(formData.memberId),
        planName: formData.planName,
        goal: formData.goal,
        durationWeeks: Number(formData.durationWeeks),
        description: formData.description,
        createdDate: formData.createdDate,
        active: formData.active,
      };

      await workoutService.addWorkoutPlan(workoutData);

      navigate("/workouts");
    } catch (err) {
      console.error("Failed to add workout plan:", err);

      setError(
        err.response?.data?.message ||
          "Failed to add workout plan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Add Workout Plan</h1>
          <p>Create a workout plan for a gym member</p>
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
            <label>Goal</label>

            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Goal
              </option>
              <option value="Weight Loss">
                Weight Loss
              </option>
              <option value="Muscle Gain">
                Muscle Gain
              </option>
              <option value="Strength">
                Strength
              </option>
              <option value="Endurance">
                Endurance
              </option>
              <option value="General Fitness">
                General Fitness
              </option>
              <option value="Flexibility">
                Flexibility
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Duration (Weeks)</label>

            <input
              type="number"
              name="durationWeeks"
              value={formData.durationWeeks}
              onChange={handleChange}
              placeholder="Enter duration in weeks"
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter workout plan description"
              rows="5"
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
              onClick={() => navigate("/workouts")}
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
                : "Add Workout Plan"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddWorkoutPlan;