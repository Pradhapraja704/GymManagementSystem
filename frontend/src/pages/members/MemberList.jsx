import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import memberService from "../../services/memberService";
import Loading from "../../components/Loading";

const MemberList = () => {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await memberService.getAllMembers();

      setMembers(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Failed to load members:", err);

      setError(
        err.response?.data?.message || "Failed to load members"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await memberService.deleteMember(id);

      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.memberId !== id)
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete member"
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
          <h1>Members</h1>
          <p>Manage gym members</p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/members/add")}
        >
          + Add Member
        </button>
      </div>

      {error && (
        <p className="login-error">
          {error}
        </p>
      )}

      {!error && members.length === 0 ? (
        <div className="empty-state">
          <p>No members found.</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Membership</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member.memberId}>
                  <td>{member.memberId}</td>

                  <td>
                    {member.firstName} {member.lastName}
                  </td>

                  <td>{member.email}</td>

                  <td>{member.phoneNumber}</td>

                  <td>{member.gender}</td>

                  <td>{member.membershipType}</td>

                  <td>
                    {member.active ? "Active" : "Inactive"}
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-button"
                        onClick={() =>
                          navigate(
                            `/members/edit/${member.memberId}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(member.memberId)
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

export default MemberList;