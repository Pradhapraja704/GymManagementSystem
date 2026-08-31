import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import trainerService from "../../services/trainerService";
import Loading from "../../components/Loading";

const TrainerList = () => {
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTrainers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await trainerService.getAllTrainers();

      setTrainers(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Failed to load trainers:", err);

      setError(
        err.response?.data?.message || "Failed to load trainers"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trainer?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await trainerService.deleteTrainer(id);

      setTrainers((prevTrainers) =>
        prevTrainers.filter(
          (trainer) => trainer.trainerId !== id
        )
      );
    } catch (err) {
      console.error("Failed to delete trainer:", err);

      setError(
        err.response?.data?.message ||
          "Failed to delete trainer"
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
          <h1>Trainers</h1>
          <p>Manage gym trainers</p>
        </div>

        <button
          className="primary-button"
          onClick={() => navigate("/trainers/add")}
        >
          + Add Trainer
        </button>
      </div>

      {error && (
        <p className="login-error">
          {error}
        </p>
      )}

      {!error && trainers.length === 0 ? (
        <div className="empty-state">
          <p>No trainers found.</p>
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
                <th>Specialization</th>
                <th>Experience</th>
                <th>Gender</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {trainers.map((trainer) => (
                <tr key={trainer.trainerId}>

                  <td>{trainer.trainerId}</td>

                  <td>{trainer.fullName}</td>

                  <td>{trainer.email}</td>

                  <td>{trainer.phoneNumber}</td>

                  <td>{trainer.specialization}</td>

                  <td>
                    {trainer.experienceYears} years
                  </td>

                  <td>{trainer.gender}</td>

                  <td>₹{trainer.salary}</td>

                  <td>
                    {trainer.active
                      ? "Active"
                      : "Inactive"}
                  </td>

                  <td>
                    <div className="action-buttons">

                      <button
                        className="edit-button"
                        onClick={() =>
                          navigate(
                            `/trainers/edit/${trainer.trainerId}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(trainer.trainerId)
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

export default TrainerList;