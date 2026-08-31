import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import assignmentService from "../../services/assignmentService";
import memberService from "../../services/memberService";
import trainerService from "../../services/trainerService";

const AddAssignment = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const [formData, setFormData] = useState({
    memberId: "",
    trainerId: "",
    assignedDate: "",
    active: true,
    remarks: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [memberResponse, trainerResponse] =
          await Promise.all([
            memberService.getAllMembers(),
            trainerService.getAllTrainers(),
          ]);

        setMembers(
          Array.isArray(memberResponse)
            ? memberResponse
            : []
        );

        setTrainers(
          Array.isArray(trainerResponse)
            ? trainerResponse
            : []
        );
      } catch (err) {
        console.error("Failed to load data:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load members or trainers"
        );
      }
    };

    loadData();
  }, []);

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
    setLoading(true);

    try {
      await assignmentService.addAssignment({
        ...formData,
        memberId: Number(formData.memberId),
        trainerId: Number(formData.trainerId),
      });

      navigate("/assignments");
    } catch (err) {
      console.error("Failed to add assignment:", err);

      setError(
        err.response?.data?.message ||
          "Failed to add assignment"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Add Trainer Assignment</h1>
          <p>Assign a trainer to a gym member</p>
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
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Trainer</label>

            <select
              name="trainerId"
              value={formData.trainerId}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Trainer
              </option>

              {trainers.map((trainer) => (
                <option
                  key={trainer.trainerId}
                  value={trainer.trainerId}
                >
                  {trainer.fullName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Assigned Date</label>

            <input
              type="date"
              name="assignedDate"
              value={formData.assignedDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Remarks</label>

            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              placeholder="Enter remarks"
              rows="3"
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

              Active Assignment
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
              onClick={() => navigate("/assignments")}
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
                : "Assign Trainer"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddAssignment;