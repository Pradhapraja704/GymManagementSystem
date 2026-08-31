import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import workoutService from "../../services/workoutService";
import memberService from "../../services/memberService";
import Loading from "../../components/Loading";

const WorkoutPlan = () => {
  const navigate = useNavigate();

  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [workoutResponse, memberResponse] =
        await Promise.all([
          workoutService.getAllWorkoutPlans(),
          memberService.getAllMembers(),
        ]);

      setWorkoutPlans(
        Array.isArray(workoutResponse)
          ? workoutResponse
          : []
      );

      setMembers(
        Array.isArray(memberResponse)
          ? memberResponse
          : []
      );
    } catch (err) {
      console.error("Failed to load workout plans:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load workout plans"
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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this workout plan?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await workoutService.deleteWorkoutPlan(id);

      setWorkoutPlans((previous) =>
        previous.filter(
          (plan) => plan.planId !== id
        )
      );
    } catch (err) {
      console.error("Failed to delete workout plan:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete workout plan"
      );
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Workout Plans</h1>
          <p>Manage member workout plans</p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            navigate("/workouts/add")
          }
        >
          + Add Workout Plan
        </button>
      </div>

      {error && (
        <p className="login-error">
          {error}
        </p>
      )}

      {!error && workoutPlans.length === 0 ? (
        <div className="empty-state">
          <p>No workout plans found.</p>
        </div>
      ) : (
        <div className="table-container">

          <table className="data-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Member</th>
                <th>Plan Name</th>
                <th>Goal</th>
                <th>Duration</th>
                <th>Description</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {workoutPlans.map((plan) => (
                <tr key={plan.planId}>

                  <td>{plan.planId}</td>

                  <td>
                    {getMemberName(plan.memberId)}
                  </td>

                  <td>{plan.planName}</td>

                  <td>{plan.goal}</td>

                  <td>
                    {plan.durationWeeks} weeks
                  </td>

                  <td>{plan.description}</td>

                  <td>{plan.createdDate}</td>

                  <td>
                    {plan.active
                      ? "Active"
                      : "Inactive"}
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="edit-button"
                        onClick={() =>
                          navigate(
                            `/workouts/edit/${plan.planId}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(plan.planId)
                        }
                      >
                        Delete
                      </button>

                    </div>
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

export default WorkoutPlan;