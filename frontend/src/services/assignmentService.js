import api from "./api";

const getAllAssignments = async () => {
  const response = await api.get("/assignments");
  return response.data;
};

const getAssignmentById = async (id) => {
  const response = await api.get(`/assignments/${id}`);
  return response.data;
};

const addAssignment = async (assignmentData) => {
  const response = await api.post("/assignments", assignmentData);
  return response.data;
};

const updateAssignment = async (id, assignmentData) => {
  const response = await api.put(
    `/assignments/${id}`,
    assignmentData
  );
  return response.data;
};

const deleteAssignment = async (id) => {
  const response = await api.delete(`/assignments/${id}`);
  return response.data;
};

const getAssignmentsByMemberId = async (memberId) => {
  const response = await api.get(
    `/assignments/member/${memberId}`
  );
  return response.data;
};

const getAssignmentsByTrainerId = async (trainerId) => {
  const response = await api.get(
    `/assignments/trainer/${trainerId}`
  );
  return response.data;
};

const assignmentService = {
  getAllAssignments,
  getAssignmentById,
  addAssignment,
  updateAssignment,
  deleteAssignment,
  getAssignmentsByMemberId,
  getAssignmentsByTrainerId,
};

export default assignmentService;