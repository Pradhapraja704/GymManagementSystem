import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import assignmentService from "../../services/assignmentService";
import memberService from "../../services/memberService";
import trainerService from "../../services/trainerService";
import Loading from "../../components/Loading";

const TrainerAssignment = () => {
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        assignmentResponse,
        memberResponse,
        trainerResponse,
      ] = await Promise.all([
        assignmentService.getAllAssignments(),
        memberService.getAllMembers(),
        trainerService.getAllTrainers(),
      ]);

      setAssignments(
        Array.isArray(assignmentResponse)
          ? assignmentResponse
          : []
      );

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
      console.error("Failed to load assignments:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load assignments"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getMemberName = (memberId) => {
    const member = members.find(
      (item) => item.memberId === memberId
    );

    if (!member) {
      return `Member #${memberId}`;
    }

    return `${member.firstName} ${member.lastName}`;
  };

  const getTrainerName = (trainerId) => {
    const trainer = trainers.find(
      (item) => item.trainerId === trainerId
    );

    if (!trainer) {
      return `Trainer #${trainerId}`;
    }

    return trainer.fullName;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Trainer Assignments</h1>
          <p>Manage trainer assignments</p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/assignments/add")}
        >
          + Add Assignment
        </button>
      </div>

      {error && (
        <p className="login-error">
          {error}
        </p>
      )}

      {!error && assignments.length === 0 ? (
        <div className="empty-state">
          <p>No trainer assignments found.</p>
        </div>
      ) : (
        <div className="table-container">

          <table className="data-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Member</th>
                <th>Trainer</th>
                <th>Assigned Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {assignments.map((assignment) => (
                <tr key={assignment.assignmentId}>

                  <td>
                    {assignment.assignmentId}
                  </td>

                  <td>
                    {getMemberName(
                      assignment.memberId
                    )}
                  </td>

                  <td>
                    {getTrainerName(
                      assignment.trainerId
                    )}
                  </td>

                  <td>
                    {assignment.assignedDate}
                  </td>

                  <td>
                    {assignment.active
                      ? "Active"
                      : "Inactive"}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default TrainerAssignment;