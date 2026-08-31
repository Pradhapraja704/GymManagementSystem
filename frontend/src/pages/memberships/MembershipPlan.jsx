import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import membershipService from "../../services/membershipService";
import Loading from "../../components/Loading";

const MembershipPlan = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await membershipService.getAllMembershipPlans();

      setPlans(
        Array.isArray(response)
          ? response
          : []
      );
    } catch (err) {
      console.error(
        "Failed to load membership plans:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to load membership plans"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this membership plan?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await membershipService.deleteMembershipPlan(id);

      setPlans((previous) =>
        previous.filter(
          (plan) => plan.planId !== id
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete membership plan:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Failed to delete membership plan"
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
          <h1>Membership Plans</h1>
          <p>Manage gym membership plans</p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            navigate("/memberships/add")
          }
        >
          + Add Membership Plan
        </button>
      </div>

      {error && (
        <p className="login-error">
          {error}
        </p>
      )}

      {!error && plans.length === 0 ? (
        <div className="empty-state">
          <p>No membership plans found.</p>
        </div>
      ) : (
        <div className="table-container">

          <table className="data-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Plan Name</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Benefits</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {plans.map((plan) => (
                <tr key={plan.planId}>

                  <td>
                    {plan.planId}
                  </td>

                  <td>
                    {plan.planName}
                  </td>

                  <td>
                    {plan.durationMonths} Months
                  </td>

                  <td>
                    ₹{plan.price}
                  </td>

                  <td>
                    {plan.benefits}
                  </td>

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
                            `/memberships/edit/${plan.planId}`
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

export default MembershipPlan;