import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dietService from "../../services/dietService";
import memberService from "../../services/memberService";
import Loading from "../../components/Loading";

const DietPlan = () => {
  const navigate = useNavigate();

  const [dietPlans, setDietPlans] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [dietResponse, memberResponse] =
        await Promise.all([
          dietService.getAllDietPlans(),
          memberService.getAllMembers(),
        ]);

      setDietPlans(
        Array.isArray(dietResponse)
          ? dietResponse
          : []
      );

      setMembers(
        Array.isArray(memberResponse)
          ? memberResponse
          : []
      );
    } catch (err) {
      console.error(
        "Failed to load diet plans:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load diet plans"
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
      "Are you sure you want to delete this diet plan?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await dietService.deleteDietPlan(id);

      setDietPlans((previous) =>
        previous.filter(
          (plan) => plan.planId !== id
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete diet plan:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete diet plan"
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
          <h1>Diet Plans</h1>
          <p>Manage member diet plans</p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            navigate("/diets/add")
          }
        >
          + Add Diet Plan
        </button>
      </div>

      {error && (
        <p className="login-error">
          {error}
        </p>
      )}

      {!error && dietPlans.length === 0 ? (
        <div className="empty-state">
          <p>No diet plans found.</p>
        </div>
      ) : (
        <div className="table-container">

          <table className="data-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Member</th>
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
                <th>Calories</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {dietPlans.map((plan) => (
                <tr key={plan.planId}>

                  <td>{plan.planId}</td>

                  <td>
                    {getMemberName(plan.memberId)}
                  </td>

                  <td>{plan.breakfast}</td>

                  <td>{plan.lunch}</td>

                  <td>{plan.dinner}</td>

                  <td>{plan.calories}</td>

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
                            `/diets/edit/${plan.planId}`
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

export default DietPlan;