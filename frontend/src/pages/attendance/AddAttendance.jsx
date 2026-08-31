import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import attendanceService from "../../services/attendanceService";
import memberService from "../../services/memberService";
import trainerService from "../../services/trainerService";

const AddAttendance = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const [formData, setFormData] = useState({
    memberId: "",
    trainerId: "",
    attendanceDate: "",
    checkInTime: "",
    checkOutTime: "",
    status: "",
    remarks: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [memberResponse, trainerResponse] = await Promise.all([
          memberService.getAllMembers(),
          trainerService.getAllTrainers(),
        ]);

        setMembers(
          Array.isArray(memberResponse) ? memberResponse : []
        );

        setTrainers(
          Array.isArray(trainerResponse) ? trainerResponse : []
        );
      } catch (err) {
        console.error("Failed to load members/trainers:", err);

        setError(
          "Failed to load members or trainers"
        );
      }
    };

    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await attendanceService.addAttendance({
        ...formData,
        memberId: Number(formData.memberId),
        trainerId: Number(formData.trainerId),
      });

      navigate("/attendance");
    } catch (err) {
      console.error("Failed to add attendance:", err);

      setError(
        err.response?.data?.message ||
          "Failed to add attendance"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Add Attendance</h1>
          <p>Record member attendance</p>
        </div>
      </div>

      <div className="form-card">

        <form onSubmit={handleSubmit}>

          <div className="form-row">

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

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Attendance Date</label>

              <input
                type="date"
                name="attendanceDate"
                value={formData.attendanceDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Status
                </option>
                <option value="Present">
                  Present
                </option>
                <option value="Absent">
                  Absent
                </option>
                <option value="Late">
                  Late
                </option>
              </select>
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Check-in Time</label>

              <input
                type="time"
                name="checkInTime"
                value={formData.checkInTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Check-out Time</label>

              <input
                type="time"
                name="checkOutTime"
                value={formData.checkOutTime}
                onChange={handleChange}
              />
            </div>

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

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <div className="form-actions">

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/attendance")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add Attendance"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddAttendance;